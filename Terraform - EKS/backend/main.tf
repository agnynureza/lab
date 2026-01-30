/*
Example AWS provider configuration and EC2 instance resource
provider "aws" {
  region = "us-west-2"
}

resource "aws_instance" "example" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"
}

variable "aws_region" {
  description = "The AWS region to deploy resources in"
  type        = string
  default     = "us-west-2"
}

output "instance_id" {
  description = "The ID of the EC2 instance"
  value       = aws_instance.example.id
}

*/

provider "aws" {
  region = "us-east-1"
}

resource "aws_s3_bucket" "example" {
  bucket = "devops-tf-eks-state-bucket"

  lifecycle {
    prevent_destroy = false
  }
}

resource "aws_dynamodb_table" "name" {
  name         = "terraform-eks-state-lock"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"
  
  attribute {
      name = "LockID"
      type = "S"
  }
}