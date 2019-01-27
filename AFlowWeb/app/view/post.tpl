{% extends "layout.tpl" %}
{% block content %}
<div class="post">
    <h2 class="post-title"><a href="#">发布主题到 Hexo 官方主题库</a></h2>
    <div class="post-meta">
      <span class="post-date">
        Feb 26 2017
      </span>
        <span class="post-author">WrittenBy Elliot</span>
    </div>

    <!--Tags-->
    <span class="post-tags">
            #<a href="Android">Android</a>&nbsp;&nbsp;
            #<a href="Ios">Ios</a>&nbsp;&nbsp;
      </span>

    <!--Cover-->
    <img src="/public/img/hello.jpg" class="post-cover"/>

    <!--content-->
    <div class="post-content">
        三天前把主题：PolarBear 上传到了 Github. 这是人生中第一个开源项目，又收获了第一个 star, excited! (and first issue…)

        接着把它提交到官方站时，遇到了不少问题。网上关于这部分的资料太少了，所以我在这里写一下教程。

        原理：将官方站的文件 clone 到你的电脑后。你会发现，这些文件和你自己的 Hexo 程序长得一模一样，其实是又下载了一个 Hexo. 然后你把的主题截图和主题信息加到这里。Hexo g, 生成新的静态文件。将它提交到你 Fork 的仓库里，pull request到原项目。最后就等待 Hexo 作者 Merge pull request, 你的主题就发布啦。

        Fork site
        Fork https://github.com/hexojs/site

        $ git clone git@github.com:frostfan/site.git # 注意这里是你 Fork 的仓库地址
        $ cd site
        $ npm install
        添加主题信息
        编辑 source/_data/themes.yml 加入你的主题信息.例如：

        - name: PolarBear
        description: A light theme base on Even, inspired by Giuem
        link: https://github.com/frostfan/hexo-theme-polarbear
        preview: https://d2fan.com
        tags:
        - simple
        - responsive
        - widget
        - two_column
        - light
        - 中文
        上传一张主题截图（名字是主题名，且必须是 800*500px PNG 格式），到 source/themes/screenshots

        生成静态内容
        生成静态文件，类似你自己的站点

        $ hexo generate
        $ hexo server
        打开 localhost:4000 后，你会发现界面和官方站一样。

        提交更改
        提交到你 Fork 的仓库

        $ git add -A
        $ git commit -m "Add theme PolarBear"
        $ git push
        pull request
        点击你 Fork 的仓库页面中的 “pull request”. 提交完后就等待作者合并吧，他反应很快的

        参考
        Git—具体实例讲解Git用法以及提交PR
        Publishing—hexo.io/docs
    </div>

    <!--pagination-->
    <div class="pagination">
        <div class="pagination__title">
            <span class="pagination__title-h">ReadOtherPosts</span>
            <hr />
        </div>
        <div class="pagination__buttons">

            <span class="button previous">
              <a href="#">
                <span class="button__icon">←</span>
                <span class="button__text">上一页</span>
              </a>
            </span>

            <span class="button next">
              <a href="#">
                <span class="button__text">下一页</span>
                <span class="button__icon">→</span>
              </a>
            </span>

        </div>
    </div>

</div>
{% endblock %}
