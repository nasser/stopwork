class String
  def to_title
    gsub(/[-_.\s]([a-zA-Z0-9])/) { $1.upcase }.gsub(/([A-Z])/) { " #{$1}"}.gsub(/^([a-z])/) { $1.upcase }
  end
end