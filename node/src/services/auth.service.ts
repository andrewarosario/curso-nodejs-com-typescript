import { Request } from 'express';

class AuthService {
    
    public retornaTokenHeader(req: Request): string {
        return req.query.token || req.headers['x-access-token']
    }

}

export default new AuthService();