# frozen_string_literal: true

# Default mailer
class ApplicationMailer < ActionMailer::Base
  default from: "from@example.com"
  layout "mailer"
end
