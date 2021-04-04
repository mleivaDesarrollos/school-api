import { getConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const connectionOptions = async (): Promise<any> => {
  const options: any = await getConnectionOptions();
  return {
    ...options,
    port: Number(process.env.TYPEORM_PORT),
    autoLoadEntities: true,
    options: {
      enableArithAbort: false,
    },
    namingStrategy: new SnakeNamingStrategy(),
    synchronize: process.env.NODE_ENV === 'test',
    timezone: 'Z',
  };
};
