pipeline {
  agent {
    docker {
      image 'node'
    }

  }
  stages {
    stage('install') {
      steps {
        sh 'npm -g install angular'
      }
    }
  }
}