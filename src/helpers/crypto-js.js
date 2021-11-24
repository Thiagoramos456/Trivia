import md5 from 'crypto-js/md5';

const convertToMd5 = (emailDoUsuário) => md5(emailDoUsuário).toString();

export default convertToMd5;
