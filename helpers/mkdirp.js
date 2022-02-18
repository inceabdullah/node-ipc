import mkdirp from 'mkdirp';
import _ from 'lodash';

const mkdirParentsPathSync = (filePath) => {
    const folderFileIn = ("/" + _.initial(filePath.split("/")).join("/")).replace(/\/\//g, "/");
    mkdirp.sync(folderFileIn)
};

export {
    mkdirParentsPathSync as default,
    mkdirParentsPathSync
}