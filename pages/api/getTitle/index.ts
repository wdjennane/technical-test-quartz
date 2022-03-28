import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

type Data = {
  title: string | string[];
  status: number;
};

type ErrorPayload = {
  error: string;
  status: number;
};

const parseTitle = (body: string) => {
  let title = body.match(/<title>([^<]*)<\/title>/);
  if (!title || typeof title[1] !== "string")
    throw new Error("Unable to parse");
  return title[1];
};

export default async function getUrlTitle(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorPayload>
) {
  const {
    query: { url },
  } = req;

  try {
    const rawData = await fetch(<string>url);
    const rawPage = await rawData.text();
    const parsePage = await parseTitle(rawPage);

    res.status(200).json({
      title: parsePage,
      status: res.statusCode,
    });
  } catch (err: Error | any) {
    res.status(404).json({
      error: "Url not found",
      status: res.statusCode,
    });
  }
  return;
}
