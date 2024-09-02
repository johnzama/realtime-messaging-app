pipeline {
    agent any
    stages {
        stage('Build Frontend') {
            steps {
                sh 'docker build -t frontend ./frontend'
            }
        }
        stage('Build Backend') {
            steps {
                sh 'docker build -t backend ./backend'
            }
        }
        stage('Test') {
            steps {
                sh 'docker run --rm frontend npm test'
                sh 'docker run --rm backend npm test'
            }
        }
        stage('Deploy') {
            steps {
                // Deploy steps (e.g., using Docker Compose or Kubernetes)
            }
        }
    }
}

