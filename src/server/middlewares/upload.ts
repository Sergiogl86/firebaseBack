import Axios from "axios";

import chalk from "chalk";

import Debug from "debug";

import { storage } from "../../database/index";

const debug = Debug("firebaseback:uploadMiddleware");

const upload = async (urlFile: string, nameFile: string) => {
  const bucket = storage.bucket("gs://consulta-bd.appspot.com");
  const name = `${nameFile}-${Date.now()}`;
  const file = bucket.file(`files/${name}.jpg`);

  let fileURL = "";

  const response = await Axios({
    method: "GET",
    url: urlFile,
    responseType: "stream",
  });

  const contentType = response.headers["content-type"];

  const writeStream = file.createWriteStream({
    metadata: {
      contentType,
      metadata: {
        myValue: 123,
      },
    },
  });

  response.data.pipe(writeStream);

  return new Promise((resolve, reject) => {
    writeStream.on("finish", async () => {
      // do stuff
      await bucket.file(`files/${name}.jpg`).makePublic();
      fileURL = bucket.file(`files/${name}.jpg`).publicUrl();
      debug(chalk.red("La Url de Firebase es ->"));
      debug(chalk.blue(fileURL));
      resolve(fileURL);
    });

    writeStream.on("error", (err) => {
      reject(err);
    });
  });
};

export default upload;
