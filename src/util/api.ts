import {request} from './http'

const baseUrl = 'http://localhost:3000'
const header = {'content-type': 'application/json'}

/**
 * 登录
 * @param data
 */
export const login = async (data: { username: string, password: string }) => {
  return await request({
    url: `${baseUrl}/user/login`,
    method: 'POST',
    header: header,
    data: data,
  })
}

/**
 * 发布预约
 * @param token
 * @param data
 */
export const order = async (token: string, data: {
  content: string,
  unit: string,
  people: string,
  date: string,
  startTime: string,
  endTime: string,
  extra: string,
}) => {
  return await request({
    url: `${baseUrl}/order`,
    method: 'POST',
    header: {...header, Authorization: `Bearer ${token}`},
    data: data,
  })
}


/**
 * 获取自己的预约
 * @param token
 * @param page
 */
export const getMyOrder = async (token: string, page: number) => {
  return await request({
    url: `${baseUrl}/order/my`,
    method: 'GET',
    header: {...header, Authorization: `Bearer ${token}`},
    data: {page,}
  })
}


/**
 * 获取所有预约
 * @param page
 */
export const getAllOrder = async (page: number) => {
  return await request({
    url: `${baseUrl}/order`,
    method: 'GET',
    header: header,
    data: {page,}
  })
}


/**
 * 审核预约
 * @param token
 * @param id
 * @param pass
 * @param reason
 */
export const audit = async (token: string, id: string, pass: boolean, reason?: string) => {
  return await request({
    url: `${baseUrl}/order/${id}`,
    method: 'PUT',
    header: {...header, Authorization: `Bearer ${token}`},
    data: {pass, reason}
  })
}
