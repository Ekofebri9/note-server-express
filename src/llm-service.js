import { BedrockRuntimeClient, ConversationRole, ConverseStreamCommand } from '@aws-sdk/client-bedrock-runtime';

// Fungsi utama untuk generate respons dari LLM Bedrock
export default async function generateResponseLlm(inputText, config = {}) {
    // Konfigurasi default untuk region dan modelId
    const region = 'us-east-1';
    const modelId = 'amazon.nova-2-lite-v1:0';

    // Inisialisasi AWS Bedrock client dengan region tertentu
    const client = new BedrockRuntimeClient({ region });

    // Membuat message dengan role USER dan teks input dari pengguna
    const message = {
        content: [{ text: inputText }],
        role: ConversationRole.USER,
    };

    // Menyusun request berisi model id, pesan, dan konfigurasi inference (maxTokens & temperature)
    const request = {
        modelId,
        messages: [message],
        inferenceConfig: {
            maxTokens: config.maxTokens || 500,
            temperature: config.temperature || 0.5,
        },
    };

    try {
        // Mengirim request ke Bedrock menggunakan ConverseStreamCommand (streaming response)
        const response = await client.send(new ConverseStreamCommand(request));
        const result = [];

        // Looping untuk membaca hasil streaming dari response
        for await (const chunk of response.stream) {
            if (chunk.contentBlockDelta) {
                // Ambil teks dari delta lalu simpan ke array result
                const text = chunk.contentBlockDelta.delta?.text || '';
                result.push(text);
            }
        }

        // Gabung semua potongan teks hasil streaming jadi satu string
        return result.join('');
    } catch (error) {
        // Logging error kalau request gagal dijalankan
        console.error(`ERROR: Can't invoke '${modelId}'. Reason: ${error.message}`);
        throw error;
    }
}