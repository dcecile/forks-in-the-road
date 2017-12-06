# frozen_string_literal: true

module Overcommit
  module Hook
    module PreCommit
      # Overcommit hook for Rails tests
      class RailsTest < Base
        def description
          "Run all Rails tests"
        end

        def require_files
          false
        end

        def run
          result = execute(%w[bin/rails test])
          return :pass if result.success?

          output = result.stdout + result.stderr
          [:fail, output]
        end
      end
    end
  end
end
