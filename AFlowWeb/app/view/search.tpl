{% extends "layout.tpl" %}
{% block content %}

<div class="posts post on-list">
    {% for archive in archives %}
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

        <div>搜索结果为空</div>

        {% endfor %}

    </section>

    {% else %}
    <h2>{{error}}</h2>
    {% endfor %}
</div>

{% endblock %}
