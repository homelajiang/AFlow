{% extends "layout.tpl" %}
{% block content %}
<div class="posts">
    <div class="post on-list">
        <h1 class="post-title"><a href="#">发布主题到 Hexo 官方主题库</a></h1>
        <div class="post-meta">
        <span class="post-date">
          Feb 26 2017
        </span>
            <span class="post-author"> Written by Radek</span>
        </div>

        <span class="post-tags">
            #<a href="Android">Android</a>&nbsp;
            #<a href="Ios">Ios</a>&nbsp;
        </span>
        <img src="/public/img/hello.jpg" class="post-cover"/>

        <div class="post-content">
            三天前把主题：PolarBear 上传到了 Github. 这是人生中第一个开源项目，又收获了第一个 star, excited! (and first issue…)

            接着把它提交到官方站时，遇到了不少问题。网上关于这部分的资料太少了，所以我在这里写一下教程。
        </div>
        <div><a class="read-more button" href="#">ReadMore →</a></div>
    </div>

    <!--pagination-->
    <div class="pagination">
        <div class="pagination__buttons">
            {{ if .Paginator.HasPrev }}
            <span class="button previous">
        <a href="#">
          <span class="button__icon">←</span>
          <span class="button__text">Newer posts</span>
        </a>
      </span>
            {{ end }}
            {{ if .Paginator.HasNext }}
            <span class="button next">
        <a href="#">
          <span class="button__text">Older posts</span>
          <span class="button__icon">→</span>
        </a>
      </span>
            {{ end }}
        </div>
    </div>
    <!--pagination-->
</div>
{% endblock %}

