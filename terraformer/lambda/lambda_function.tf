resource "aws_lambda_function" "tfer--AcceptAnswerFunction" {
  function_name                  = "AcceptAnswerFunction"
  handler                        = "index.handler"
  memory_size                    = "128"
  package_type                   = "Zip"
  reserved_concurrent_executions = "-1"
  role                           = "arn:aws:iam::744302382340:role/service-role/GetAllFunction-role-buwwkg2y"
  runtime                        = "nodejs14.x"
  source_code_hash               = "Ly+ce4J+I/H7G0okIpzSswr9IFB8XO4e1h5DIHQNhR4="
  timeout                        = "3"

  tracing_config {
    mode = "PassThrough"
  }
}

resource "aws_lambda_function" "tfer--AddQuestionFunction" {
  function_name                  = "AddQuestionFunction"
  handler                        = "index.handler"
  memory_size                    = "128"
  package_type                   = "Zip"
  reserved_concurrent_executions = "-1"
  role                           = "arn:aws:iam::744302382340:role/service-role/GetAllFunction-role-buwwkg2y"
  runtime                        = "nodejs14.x"
  source_code_hash               = "Pl+4CFnCexAa+YnrRc4lKeafhPEZ/dWgO7TH0aQnifw="
  timeout                        = "60"

  tracing_config {
    mode = "PassThrough"
  }
}

resource "aws_lambda_function" "tfer--DeleteQuestionFunction" {
  function_name                  = "DeleteQuestionFunction"
  handler                        = "index.handler"
  memory_size                    = "128"
  package_type                   = "Zip"
  reserved_concurrent_executions = "-1"
  role                           = "arn:aws:iam::744302382340:role/service-role/GetAllFunction-role-buwwkg2y"
  runtime                        = "nodejs14.x"
  source_code_hash               = "JDx64ITBQknIgp0W40eIKI4AkNn1Oh6u3ozl52MIKvg="
  timeout                        = "3"

  tracing_config {
    mode = "PassThrough"
  }
}

resource "aws_lambda_function" "tfer--GetAllFunction" {
  function_name                  = "GetAllFunction"
  handler                        = "index.handler"
  memory_size                    = "128"
  package_type                   = "Zip"
  reserved_concurrent_executions = "-1"
  role                           = "arn:aws:iam::744302382340:role/service-role/GetAllFunction-role-buwwkg2y"
  runtime                        = "nodejs14.x"
  source_code_hash               = "Z69m885SMPmH6Hq/zve16TaZeV4oo3dH8yhovl6IQ34="
  timeout                        = "60"

  tracing_config {
    mode = "PassThrough"
  }
}

resource "aws_lambda_function" "tfer--UpdateAnswerFunction" {
  function_name                  = "UpdateAnswerFunction"
  handler                        = "index.handler"
  memory_size                    = "128"
  package_type                   = "Zip"
  reserved_concurrent_executions = "-1"
  role                           = "arn:aws:iam::744302382340:role/service-role/GetAllFunction-role-buwwkg2y"
  runtime                        = "nodejs14.x"
  source_code_hash               = "IwB/trLIUkhrnrlcM87R/lkiPKVqLuXGPAQagf2LL+Y="
  timeout                        = "60"

  tracing_config {
    mode = "PassThrough"
  }
}

resource "aws_lambda_function" "tfer--UpvoteAnswerFunction" {
  function_name                  = "UpvoteAnswerFunction"
  handler                        = "index.handler"
  memory_size                    = "128"
  package_type                   = "Zip"
  reserved_concurrent_executions = "-1"
  role                           = "arn:aws:iam::744302382340:role/service-role/GetAllFunction-role-buwwkg2y"
  runtime                        = "nodejs14.x"
  source_code_hash               = "bLqJKLX1jmzUHsp30SMxDV73LRV4qTpNCSpN9HbXc5U="
  timeout                        = "3"

  tracing_config {
    mode = "PassThrough"
  }
}

resource "aws_lambda_function" "tfer--dmQuestion" {
  function_name                  = "dmQuestion"
  handler                        = "lambda_function.lambda_handler"
  memory_size                    = "128"
  package_type                   = "Zip"
  reserved_concurrent_executions = "-1"
  role                           = "arn:aws:iam::744302382340:role/service-role/dmQuestion-role-y49gvamh"
  runtime                        = "python3.8"
  source_code_hash               = "fI06ZlRH/KN6Ra3twvdRllUYaxv182Tjx0qNWNlKIhI="
  timeout                        = "3"

  tracing_config {
    mode = "PassThrough"
  }
}
