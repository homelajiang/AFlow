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
                {{post.create_date}}
            </span>
            <span class="more-meta">
              <a href="/post/{{post.id}}" class="archive-post-link">
                  {{post.title}}
              </a>
            </span>
        </div>
        {% endfor %}

    </section>
    {% endfor %}
</div>

{% endblock %}
