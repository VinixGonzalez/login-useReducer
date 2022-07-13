import { AuthProps } from "../components/Login/models";

export async function login({ password, username }: AuthProps) {
  return new Promise<boolean>((resolve, reject) => {
    setTimeout(() => {
      if (password === "748425" && username === "vinix74") {
        resolve(true);
      } else {
        reject(false);
      }
    }, 2000);
  });
}
