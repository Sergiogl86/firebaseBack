import Fs from "fs";

import Path from "path";

import Axios from "axios";

const download = async (url: string, name: string) => {
  const path = Path.resolve(__dirname, "downloads", `${name}.jpg`);

  const response = await Axios({
    method: "GET",
    url,
    responseType: "stream",
  });

  console.log(response);

  response.data.pipe(Fs.createWriteStream(path));

  /* return new Promise<void>((resolve, reject) => {
    response.data.on("end", () => {
      resolve();
    });

    response.data.on("error", (err: any) => {
      reject(err);
    });
  }); */
};

export default download;
