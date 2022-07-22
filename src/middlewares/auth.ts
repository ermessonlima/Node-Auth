import { NextFunction, Request, Response } from "express"
import { User } from "../models/User";

export const Auth = {

    private: async ( req: Request, res: Response, next: NextFunction ) => {
        let sucess = false;

        if(req.headers.authorization){
            const token = req.headers.authorization.split(' ')[1];
            console.log(token);
            const payload = Buffer.from(token, 'base64').toString();
            
            const data = payload.split(':');
            console.log(data);

            if(data.length === 2 ){
                let user = await User.findOne({
                    where: {
                        email: data[0],
                        password: data[1]
                    }
                });

                if(user){
                    sucess = true;
                }
            }
         
        }

        if(sucess) {
            next();
        } else {
            res.status(403).json({
                error: "Unauthorized"
            });
        }
    }

}