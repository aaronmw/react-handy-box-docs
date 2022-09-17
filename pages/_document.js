import Document from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
            <link rel="shortcut icon" href="/favicon.ico" />
            <link
              href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap"
              rel="stylesheet"
            />
            <link rel="stylesheet" href="/font-awesome-6/css/all.min.css" />
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
}
