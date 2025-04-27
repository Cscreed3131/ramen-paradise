import { Client, Storage } from 'appwrite';
import appwriteConf from '../conf/appwriteConfig';

const client = new Client();

client
    .setEndpoint(appwriteConf.appwriteUrl) 
    .setProject(appwriteConf.appwriteProjectId);

// Export Storage instance
export const storage = new Storage(client);

export default client;