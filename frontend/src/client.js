import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// ! Đọc docs tại https://www.sanity.io/docs/js-client
export const client = sanityClient({
  // * projectId sẽ lấy từ sanity manage
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: "production",
  // * apiVersion: sẽ lấy chính cái UTC Date hiện tại
  apiVersion: "2021-12-23",
  // * Dùng để cho người dùng tải ảnh nhanh hơn nếu để true
  // * useCdn: true, // `false` if you want to ensure fresh data
  useCdn: true,
  // * token này sẽ tạo ra ở sanity manage
  // * Truy cập phần API và tạo Tokens với Permissions EDITOR nhằm tránh bị lỗi access deny và tạo thêm CORS origins để sanity có thể nhận được POST từ web client
  token: process.env.REACT_APP_SANITY_TOKEN,
});

// ! https://www.sanity.io/docs/image-url đọc thêm tại đây
const builder = imageUrlBuilder(client);

export const urlFor = (source) => {
  return builder.image(source);
};
