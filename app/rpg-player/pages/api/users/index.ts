import User, { IUser } from '../../../models/users/user.model';
import dbConnect from '../../../utils/database.utils'
import { NextApiRequest, NextApiResponse } from 'next';
import { CrudBuilder } from '../../../utils/crud-builder.utils';
import Validator from 'validatorjs';
import UserValidator from '../../../models/users/user.validator';

export default new CrudBuilder()
.db( async ()=>{
    await dbConnect();
})
.get(async (req: NextApiRequest, res: NextApiResponse) => {
    let users = await User.find();
    res.status(200).json({ success: true, data: users});
})
.post(async (req: NextApiRequest, res: NextApiResponse) => {
    let newUser = JSON.parse(req.body);
    const validation = new Validator(newUser, UserValidator);

    if(validation.fails()) {
        const errorMessage = JSON.stringify(validation.errors.all());
        res.status(400).json({ success: false, message: errorMessage});
    } else {
        res.status(200).json({ success: true, message: 'User created'});
    }
})
.build();