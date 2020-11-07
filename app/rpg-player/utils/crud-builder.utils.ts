import { NextApiRequest, NextApiResponse } from "next";

type Handler = (req: NextApiRequest, res: NextApiResponse)=>void;

export class CrudBuilder {
    private _get: Handler;
    private _head: Handler;
    private _post: Handler;
    private _put: Handler;
    private _delete: Handler;
    private _connect: Handler;
    private _options: Handler;
    private _trace: Handler;
    private _patch: Handler;
    private _methods = [];
    private _db: ()=>void;

    db(initDatabase: ()=>void) {
        this._db=initDatabase;
        return this;
    }

    get(handler: Handler){
        this._get = handler;
        this._methods.push('GET');
        return this;
    }
    head(handler: Handler){
        this._head = handler;
        this._methods.push('HEAD');
        return this;
    }
    post(handler: Handler){
        this._post = handler;
        this._methods.push('POST');
        return this;
    }
    put(handler: Handler){
        this._put = handler;
        this._methods.push('PUT');
        return this;
    }
    delete(handler: Handler){
        this._delete = handler;
        this._methods.push('DELETE');
        return this;
    }
    connect(handler: Handler){
        this._connect = handler;
        this._methods.push('CONNECT');
        return this;
    }
    options(handler: Handler){
        this._options = handler;
        this._methods.push('OPTIONS');
        return this;
    }
    trace(handler: Handler){
        this._trace = handler;
        this._methods.push('TRACE');
        return this;
    }
    patch(handler: Handler){
        this._patch = handler;
        this._methods.push('PATCH');
        return this;
    }
    build() {
        return async (req: NextApiRequest, res: NextApiResponse) => {
            try {
                if(this._methods.includes(req.method)){
                    if(this._db) this._db();

                    switch(req.method) {
                        case 'GET':
                            await this._get(req, res);
                            break;
                        case 'HEAD':
                            await this._head(req, res);
                            break;
                        case 'POST':
                            await this._post(req, res);
                            break;
                        case 'PUT':
                            await this._put(req, res);
                            break;
                        case 'DELETE':
                            await this._delete(req, res);
                            break;
                        case 'CONNECT':
                            await this._connect(req, res);
                            break;
                        case 'OPTIONS':
                            await this._options(req, res);
                            break;
                        case 'TRACE':
                            await this._trace(req, res);
                            break;
                        case 'PATCH':
                            await this._patch(req, res);
                            break;
                    }
                } else {
                    res.status(405).json({ success: false, error: 'api doesn\'t support method: '+req.method });
                }
            } catch(error) {
                res.status(500).json({ success: false, message: error.toString() });
            }
        }
    }
}