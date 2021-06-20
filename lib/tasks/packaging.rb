desc "Package OnDemand"
namespace :package do

  require_relative 'build_utils'
  include BuildUtils

  task :tar, [:output_dir] do
    v = ood_packaged_version
    tar = "#{args[output_dir] || 'packaging'}/v#{v}.tar.gz"
    sh "git ls-files | #{tar} -c --transform 's,^,ondemand-#{v}/,' -T - | gzip > #{tar}"
  end

  task container: [:clean] do
    sh build_cmd("Dockerfile", image_name) unless image_exists?("#{image_name}:#{image_tag}")
  end

  task latest_container: [:container] do
    sh tag_latest_container_cmd(image_name)
  end

  task test_container: [:latest_container] do
    sh build_cmd("Dockerfile.test", test_image_name) unless image_exists?("#{test_image_name}:#{image_tag}")
    sh tag_latest_container_cmd(test_image_name)
  end

  task dev_container: [:latest_container] do
    if ENV['OOD_KEEP_USERNS'].to_s.empty?
      extra = []
    else
      username = Etc.getlogin
      extra = ["--build-arg", "USER=#{username}"]
      extra.concat ["--build-arg", "UID=#{Etc.getpwnam(username).uid}"]
      extra.concat ["--build-arg", "GID=#{Etc.getpwnam(username).uid}"]
    end

    sh build_cmd("Dockerfile.dev", dev_image_name, extra_args: extra) unless image_exists?("#{dev_image_name}:#{image_tag}")
    sh tag_latest_container_cmd(dev_image_name)
  end
end