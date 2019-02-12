{% extends "layout.tpl" %}
{% block content %}
<div class="posts">
    {% for post in list %}
    <div class="post on-list">
        <h1 class="post-title"><a href="/post/{{post.id}}">{{post.title}}</a></h1>
        <div class="post-meta">
        <span class="post-date">
          <!--Feb 26 2017-->
            {{post.create_date}}
        </span>
            <!--<span class="post-author"> Written by Radek</span>-->
        </div>

        <span class="post-tags">
            {% for tag in post.tags %}
                #<a href="/tag/{{tag.id}}">{{ tag.name }}</a>&nbsp;
            {% endfor%}
        </span>

        {% if post.cover %}
        <img src="{{post.cover}}" class="post-cover"/>
        {% endif %}

        <div class="post-content">
            {{post.description}}
        </div>
        <div><a class="read-more button" href="/post/{{post.id}}">ReadMore →</a></div>
    </div>
    {% endfor %}
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
          <span class="button__text">Older posts</span>
          <span class="button__icon">→</span>
        </a>
      </span>
            {% endif %}
        </div>
    </div>
    <!--pagination-->
</div>
{% endblock %}

