import Document, {
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import { ReactElement } from "react";

export default class MyDocument extends Document {
 

  public render(): ReactElement {
    return (
      <Html>
        <Head>
          <link rel="manifest" href="manifest.json" />
          <link rel="icon" id="custom-favicon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
