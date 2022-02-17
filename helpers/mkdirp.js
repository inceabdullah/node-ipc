import mkdirp from 'mkdirp';
import _ from 'lodash';
import deasync from 'deasync';

const mkdirParentsPath = (filePath) => new Promise(async (resolve, reject) =>{
    const folderFileIn = "/" + _.initial(filePath.split("/")).join("/");
    await mkdirp(folderFileIn).catch(reject);
    resolve(true);
});

const mkdirParentsPathSync = (filePath) => {
    let done = false;
    let err;
    let result;

    mkdirParentsPath(filePath).then(res => {
        result = res;
        done = true;
        })
        .catch(e => {   // eslint-disable-line no-unused-vars       
            err = e;
            done = true;   // eslint-disable-line no-unused-vars        });
        });
        deasync.loopWhile(function(){return !done;});

    if (err) {
        throw err;
    } else {   
        return result;
    }
};

export {
    mkdirParentsPath as default,
    mkdirParentsPath,
    mkdirParentsPathSync
}