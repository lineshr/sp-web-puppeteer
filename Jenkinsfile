node {

    def imageTag = "lineshr/sp-web-puppeteer-test:${env.BUILD_NUMBER}"
    def dockerHome = tool 'nyDocker'

    stage("Initializing") {
        //cleanWs();
        checkout scm;
        sh 'git reset --hard'
        env.PATH = "${dockerHome}/bin:${env.PATH}"
    }

    stage("Building Images") {
        sh "docker build -t ${imageTag} -f docker/Dockerfile ."
    }
    
    
                stage("Env Variables") {
 
                echo "The build number is ${env.BUILD_NUMBER}"
                echo "You can also use \${BUILD_NUMBER} -> ${BUILD_NUMBER}"
                sh 'echo "I can access $BUILD_NUMBER in shell command as well."'

        }

   stage("Running Tests CodeceptJS") {
        try {
      
                echo "The build number is ${env.BUILD_NUMBER}"
                echo "You can also use \${BUILD_NUMBER} -> ${BUILD_NUMBER}"
                sh 'echo "I can access $BUILD_NUMBER in shell command as well."'
            sh '"run-final-tests.sh $BUILD_NUMBER"'
            println "done."
        }
        finally {
          //  sh "ls report/"
            allure includeProperties: false, jdk: '', results: [[path: 'report']]
        }
    }



}
