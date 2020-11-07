import mongoose, {Mongoose} from 'mongoose';
import fs from 'fs';
import path from 'path';

interface MongoConnection {
    isConnected?: number;
    db?: Mongoose;
}

const connection: MongoConnection = {}
let environment: Array<any>;
let mongoURL: string;

export default async function dbConnect() {
  if (connection.isConnected) {
    return
  }

  parseEnv();

  if(!mongoURL) mongoURL = `mongodb://${environment['DB_USERNAME']}:${environment['DB_PASSWORD']}@${environment['DB_DOMAIN']}:${environment['DB_PORT']}/${environment['DB_NAME']}`;

  connection.db = await mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })

  connection.isConnected = connection.db.connections[0].readyState;
}

function parseEnv() {
    if (environment) return;
    environment = [];
    const envPath = path.join('..','..','database','.env');
    const envContent = fs.readFileSync(envPath);
    for(let line of envContent.toString().split('\n')) {
        const parts = line.split('=');
        if(parts.length != 2) continue;// skipping malformed lines
        environment[parts[0].trim()]=parts[1].trim().replace(/"|'/g, '');
    }
    
    environment['DB_PORT'] = environment['DB_PORT'] || 27017;
    environment['DB_DOMAIN'] = environment['DB_DOMAIN'] || 'localhost';
}