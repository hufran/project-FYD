/**
 * 版本信息的处理
 */
global.versionControl=Object.create({},{
    version:{
        value:"dev",
        writeable:false,
        configurable:false
    },
    versionNumber:{
        value:"1.0.0",
        configurable:false
    },
    versionDescribe:{
        value:"该版本为首次发布版本！",
        configurable:false
    }
});