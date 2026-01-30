/*
we need to record response after execute API call aws

vpc_id, private_subnet, public_subnet
*/

output "vpc_id" {
    description = "EKS cluster endpoint"
    value = aws_vpc.main.id
}

output "private_subnet_ids" {
    description = "Private subnet IDs"
    value = aws_subnet.private[*].id
}

output "public_subnet_ids" {
    description = "Public subnet IDs"
    value = aws_subnet.public[*].id
}