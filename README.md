# SecureTouch 7 Pro

A premium, minimalist UI concept for a 7-inch touch alarm panel featuring a video background, real-time data, and high-fidelity interactive elements.

## Deployment to Netlify

This project is configured for easy deployment to Netlify.

### Prerequisites

- A [Netlify](https://www.netlify.com/) account.
- A Git provider account (GitHub, GitLab, or Bitbucket).

### Steps to Deploy

1. **Push to Git**: Push this project to a repository on your Git provider.
2. **New Site in Netlify**:
   - Log in to your Netlify dashboard.
   - Click **"Add new site"** > **"Import an existing project"**.
   - Select your Git provider and authorize Netlify.
   - Choose the repository you just pushed.
3. **Configure Build Settings**:
   - Netlify should automatically detect the settings from `netlify.toml`.
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. **Deploy**: Click **"Deploy site"**.

### Manual Deployment (Drag & Drop)

Alternatively, you can build the project locally and drag the output folder to Netlify:

1. Run `npm run build` in your terminal.
2. Locate the `dist` folder created in the project root.
3. Drag and drop the `dist` folder onto the "Sites" tab in your Netlify dashboard.

## Development

To run the project locally:

```bash
npm install
npm run dev
```
