# frozen_string_literal: true

# More info at http://api.rubyonrails.org/classes/ActiveSupport/Inflector/Inflections.html

ActiveSupport::Inflector.inflections(:en) do |inflect|
  inflect.irregular "criterion", "criteria"
end
