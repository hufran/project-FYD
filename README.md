项目构建与启动：
1、在该项目目录下全局安装babel编译器，使用 npm install -g babel-cli  
2、进入该项目根目录下，使用npm install命令安装依赖包  
3、进入public/inquiry目录下，使用npm install 命令安装所需依赖  
4、回到项目跟目录下，使用npm run start来启动应用  
注：如果需要调整接口，请自行修改bin/www文件端口处  
  
项目上线发布与版本管理：  
注：项目的版本管理使用跟目录下的config.js文件进行管理，该文件没有放到git中进行管理。  
一、上线发布  
1、在服务器中安装git，并制定对应位置执行 git clone git@10.4.33.236:front/project-FYD.git 命令，来下载项目到服务器中  
2、进入项目的跟目录中，将本地项目中的config文件进行修改（需要保留备份），改为下面代码  
global.versionControl=Object.create({},{  
    version:{  
        value:"master",
        writeable:false,
        configurable:false
    },  
    versionNumber:{  
        value:"1.0.0",
        configurable:false
    }
});
3、将改好的文件单独上传到服务器的跟目录下，之后可以不用再做任何修改  
4、将本地的config文件改回原来的样子，就可以了  
5、按照方面的项目构建预启动方式操作，并运行项目  
6、后期有任何更新可以直接直接使用git pull origin master 命令更新线上代码  
  
二、版本管理  
1、通过修改app.js即可以实现版本管理，在app.js里面将versionControl.versionNumber=值，既可以更新项目版本  


