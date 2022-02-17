import fs from "fs";

const fileUnlink = (filePath) => {
    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);

            return true;
        }
    } catch (e){
        throw e;
    }

}

export {
    fileUnlink as default,
    fileUnlink
}