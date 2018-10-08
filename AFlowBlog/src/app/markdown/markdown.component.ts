import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as CodeMirror from 'codemirror';

import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/gfm/gfm';
import 'codemirror/addon/mode/simple';
import 'codemirror/mode/css/css';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/haml/haml';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/php/php';
import 'codemirror/mode/python/python';
import 'codemirror/mode/powershell/powershell';
import 'codemirror/mode/ruby/ruby';
import 'codemirror/mode/shell/shell';
import 'codemirror/mode/slim/slim';
import 'codemirror/mode/sql/sql';
import 'codemirror/mode/stex/stex';
import 'codemirror/mode/textile/textile';
import 'codemirror/mode/verilog/verilog';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/xquery/xquery';
import 'codemirror/mode/rust/rust';
import 'codemirror/mode/mscgen/mscgen';
import 'codemirror/mode/dylan/dylan';
import 'codemirror/mode/meta';
import 'codemirror/addon/mode/overlay';
import 'codemirror/addon/mode/multiplex';
import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/addon/selection/active-line';


@Component({
  selector: 'app-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.css']
})
export class MarkdownComponent implements OnInit, AfterViewInit {
  private editor: CodeMirror.EditorFromTextArea;

  // 编辑模式、预览模式

  constructor() {
  }

  ngOnInit() {

  }

  /**
   * On component view init
   */
  ngAfterViewInit() {
    this.codeMirrorInit();
  }


  codeMirrorInit() {
    this.editor = CodeMirror.fromTextArea(document.querySelector('#editor textarea'), {
      lineNumbers: true,
      mode: 'gfm',
      theme: 'base16-light',
      // 文字多时换行是否滚动
      lineWrapping: false,
      extraKeys: {
        Enter: 'newlineAndIndentContinueMarkdownList',
        Home: 'goLineLeft',
        End: 'goLineRight',
        'Shift-Tab': 'indentLess'
      },
      tabSize: 4,
      indentUnit: 4,
      viewportMargin: Infinity,
      showCursorWhenSelecting: true,
      // null隐藏滚动条
      scrollbarStyle: null,
    });

    const codeMirror: any = document.querySelector('#editor > .CodeMirror');
    codeMirror.style.lineHeight = 2;


    this.editor.focus();

    const temp_post = localStorage.getItem('temp_post');
    if (temp_post !== null) {
      this.editor.setValue(temp_post);
    }

        this.editor.setValue('\n\n' + '## 回复可见的是\n' +
          '>引用\n\n* 元\--啦啦--n\n**哇呕**\n```javascript\nfunction(){\nalert("yuan");\n}\n' +
          'module.exports = require(\'./lib/marked\');\n' +
          'import "com.android.utils.*"' + '\n' +
          '```\n' + '$$E=mc^2$$');
    // this.editor.setValue('1111$$E=mc^2$$');

    this.editor.on('change', (e, obj) => {
      this.updateAsync();
    });

    setTimeout(() => {
      this.updateAsync();
    }, 0);
  }

  private updateAsync() {
  }

}
