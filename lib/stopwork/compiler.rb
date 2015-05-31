module Stopwork
  class Compiler
    # Convert slide source to string array
    def self.compile source
      source.split("\n").
        reject { |e| e.empty? }.    # empty lines
        reject { |e| e =~ /^;/ } # comments
    end
  end
end