# CHATTERBOX TTS Configuration & Deployment

This guide provides comprehensive instructions for deploying and configuring the **CHATTERBOX_TTS** synthesis engine on Modal. It covers the complete end-to-end setup, from local Python environment initialization to CLI-based secrets management.

## 🚀 Overview

- **Host**: [Modal](https://modal.com/) (GPU-accelerated Serverless)
- **Model**: `chatterbox-tts` (Vocal identity synthesis)
- **Engine Logic**: `chatterbox_tts.py`
- **Latency**: Engineered for sub-200ms processing on A10G GPUs.

## 📦 Local Environment Setup

Before deploying to Modal, you must set up your local Python environment to interact with the CLI and test the model.

### 1. Install Python 3.10
Timbre AI's synthesis engine is optimized for **Python 3.10**. Ensure it is installed on your system.

### 2. Create Virtual Environment
Initialize a clean environment to manage dependencies:

```bash
# Create venv
python -m venv .venv

# Activate (Windows)
.\.venv\Scripts\Activate.ps1

# Activate (macOS/Linux)
source .venv/bin/activate
```

### 3. Install Dependencies
Install the required packages from the project root:

```bash
pip install modal chatterbox-tts python-dotenv
```

### 4. Authenticate Modal
Initialize your Modal account in the CLI:

```bash
modal setup
```

## 🔐 CLI Secrets Management

Timbre AI requires three specific secrets on Modal. You can create these directly from your terminal using the following commands:

### 1. Hugging Face Access
```bash
modal secret create hf-token HF_TOKEN=your_hugging_face_token
```

### 2. Internal API Authorization
```bash
modal secret create chatterbox-api-key CHATTERBOX_API_KEY=your_secure_api_key
```

### 3. S3-Compatible Storage (Cloudflare R2)
Replace the placeholders with your actual Cloudflare R2 or AWS S3 credentials:
```bash
modal secret create s3-storage \
  AWS_ACCESS_KEY_ID=your_access_key \
  AWS_SECRET_ACCESS_KEY=your_secret_key \
  AWS_ENDPOINT=https://<id>.r2.cloudflarestorage.com \
  AWS_REGION=auto \
  AWS_S3_BUCKET_NAME=your_bucket_name
```

## 🚀 Deployment

Once your secrets are configured, deploy the engine:

```bash
modal deploy chatterbox_tts.py
```

After deployment, Modal will provide a **Base URL** (e.g., `https://<user>--chatterbox-tts-chatterbox-serve.modal.run`). Update your [**`.env`**](file:///.env) file:

```bash
CHATTERBOX_API_URL="https://your-modal-url.modal.run"
CHATTERBOX_API_KEY="your-secure-api-key"
```

## 🧑‍💻 API Reference

### `POST /generate`
Generates a `.wav` audio buffer from text and a voice reference.

**Headers**:
- `x-api-key`: Your `CHATTERBOX_API_KEY`.

**Body**:
```json
{
  "prompt": "The text you want to synthesize.",
  "voice_key": "path/to/voice_sample.wav",
  "temperature": 0.8,
  "top_p": 0.95,
  "top_k": 1000,
  "repetition_penalty": 1.2,
  "norm_loudness": true
}
```

## 🛠️ Testing

Test the synthesis pipeline locally using the built-in entrypoint:

```bash
modal run chatterbox_tts.py --prompt "Testing the synthesis pipeline." --voice-key "voices/default.wav"
```

The output will be saved to `/tmp/chatterbox-tts/output.wav`.

---

© 2026 Timbre AI Technologies AG. All rights reserved.
