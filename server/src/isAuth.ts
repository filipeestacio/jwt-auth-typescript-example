import { MiddlewareFn } from 'type-graphql';
import { verify } from 'jsonwebtoken';
import { MyContext } from './MyContext';

// User to send authorization in format bearer hge857qpycthu

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  const authorization = context.req.headers['authorization'];

  if (!authorization) {
    throw new Error('not authenticated');
  }

  try {
    const token = authorization.split(' ')[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    context.payload = payload as any;
  } catch (error) {
    console.log(error);
    throw new Error('not authenticated');
  }

  return next();
};
