import request from "./request";

export const getImages = () =>
  request({
    url: '/images',
    method: 'get',
  });
