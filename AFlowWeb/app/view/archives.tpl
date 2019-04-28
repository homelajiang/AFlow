{% extends "layout.tpl" %}
{% block content %}

<div class="posts post on-list">
    {% for archive in list %}
    <section id="archive" class="archive">
        <div class="collection-title">
            <h2 class="archive-year">{{archive._id}}</h2>
        </div>
        {% for post in archive.posts %}
        <div class="post-meta">
            <span class="post_date">
                {{post.publish_date}}
            </span>
            <span class="more-meta" style="margin-left: 10px;">
              <a href="/post/{{post.id}}" class="archive-post-link">
                  {{post.title}}
              </a>
            </span>
        </div>

        {% else %}

        <div>没有相关数据</div>

        {% endfor %}

    </section>

    {% else %}
    <h2>{{error}}</h2>
    {% endfor %}
</div>

{% if hasPrePage or hasNextPage %}
<!--pagination-->
<div class="pagination">
    <div class="pagination__buttons">
        {% if hasPrePage %}
        <span class="button previous">
        <a href="/page/{{prePage}}">
          <span class="button__icon">←</span>
          <span class="button__text">Newer posts</span>
        </a>
      </span>
        {% endif %}

        {% if hasNextPage %}
        <span class="button next">
        <a href="/page/{{nextPage}}">
<!--            todo 按钮样式问题-->
          <span class="button__text">Older posts</span>
          <span class="button__icon">→</span>
        </a>
      </span>
        {% endif %}
    </div>
</div>
<!--pagination-->
{% endif %}

{% endblock %}
