const getApiKey = () => {
  if (
    (process.env.TINYMCE_API_KEY as string) ||
    (process.env.NEXT_PUBLIC_TINYMCE_API_KEY as string)
  ) {
    return (
      process.env.TINYMCE_API_KEY || process.env.NEXT_PUBLIC_TINYMCE_API_KEY
    );
  }
  throw Error("TinyMCE Key Not available");
};

const baseProps = {};

export const editorProps = {
 // initialValue: "",
  apiKey: getApiKey(),
  init: {
    height: 600,
    plugins:
      "save ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
    toolbar:
      "save | undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
    tinycomments_mode: "embedded",
    tinycomments_author: "Author name",
    mergetags_list: [
      { value: "First.Name", title: "First Name" },
      { value: "Email", title: "Email" },
    ],
    save_enablewhendirty: false,

    //skin: 'oxide',
    //content_css: '' ,
    ai_request: (request, respondWith) =>
      respondWith.string(() =>
        Promise.reject("See docs to implement AI Assistant"),
      ),
  },
};

export const editorPropsDark = {
 // initialValue: "",
  apiKey: getApiKey(),
  init: {
    height: 600,
    plugins:
      "save ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
    toolbar:
      "save | undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
    tinycomments_mode: "embedded",
    tinycomments_author: "Author name",
    mergetags_list: [
      { value: "First.Name", title: "First Name" },
      { value: "Email", title: "Email" },
    ],
    skin: "oxide-dark",
    content_css: "dark",
    save_enablewhendirty: false,

    // skin_style: 'body { background-color: black; color: white; }',

    content_style: `
    body { background-color: black;}`,

    ai_request: (request, respondWith) =>
      respondWith.string(() =>
        Promise.reject("See docs to implement AI Assistant"),
      ),
  },
};

export interface FileDocumentProps {
  title: string;
  element?: string | null;
  description?: string | null;
  id?: string | null;
  created_at?: string | null;
}

const image =
  "https://cdn.sanity.io/images/6d8w1e5g/production/b9657d582fceef81348198cd3d0aa9bb853729d4-748x167.png?w=256&q=75"; // ... (rest of the code remains unchanged)
export const HTML: FileDocumentProps[] = [
  {
    title: "Initial Email",
    element: `
    <p>Dear XXXX,</p>
    <p>I trust this message finds you in good spirits and that your week is off to a fantastic start. My name is Randal Herndon, and I'm a composer and songwriter specializing in XXXGENREXXXX music. I've been admiring your work, particularly as the supervisor on XXSHOWXXFILMXX, and I am reaching out to explore the possibility of connecting you with my music catalog.</p>
    <p>The contrasting yet cohesive soundtrack of XXSHOWXX caught my attention, and it truly added depth to the overall viewing experience. Your talent and skill in curating such impactful musical elements do not go unnoticed.</p>
    <p>I am confident that my catalog, coupled with my background in XXGENREXX, aligns seamlessly with your library and song selection. To provide you with a glimpse of my work, I have attached a few samples in both audio and video formats. I hope you find them reflective of the unique style I bring to the table.</p>
    <p>I am open to discussing my approach further, and I would love the opportunity to learn more about your creative process and criteria for selecting music. Pursuing music supervision is an aspiration of mine, and I believe our shared passion for creating memorable soundscapes could lead to a fruitful collaboration.</p>
    <p>I look forward to the possibility of hearing back from you and the opportunity to connect further. Thank you for considering my inquiry, and I appreciate your time.</p>
    <p>Warm regards,<br/>
    Randal Herndon<br/>
    Crib Music Global<br/>
    </p>
    <a href="https://cribmusic.xyz" target="_blank" rel="noopener">
    <img src=${image} alt="logo" style="width: 150px"/></a>
    <p><a href="https://cribmusic.xyz" target="_blank" rel="noopener">cribmusic.xyz</a></p>`,
    description: "Initial Email",
  },
  {
    title: "1st Follow Up Email",
    element: `
    <p>Dear XXXX,</p>
    <p>I trust this message finds you in good spirits and that your week is off to a fantastic start. My name is Randal Herndon, and I'm a composer and songwriter specializing in XXXGENREXXXX music. I've been admiring your work, particularly as the supervisor on XXSHOWXXFILMXX, and I am reaching out to explore the possibility of connecting you with my music catalog.</p>
    <p>The contrasting yet cohesive soundtrack of XXSHOWXX caught my attention, and it truly added depth to the overall viewing experience. Your talent and skill in curating such impactful musical elements do not go unnoticed.</p>
    <p>I am confident that my catalog, coupled with my background in XXGENREXX, aligns seamlessly with your library and song selection. To provide you with a glimpse of my work, I have attached a few samples in both audio and video formats. I hope you find them reflective of the unique style I bring to the table.</p>
    <p>I am open to discussing my approach further, and I would love the opportunity to learn more about your creative process and criteria for selecting music. Pursuing music supervision is an aspiration of mine, and I believe our shared passion for creating memorable soundscapes could lead to a fruitful collaboration.</p>
    <p>I look forward to the possibility of hearing back from you and the opportunity to connect further. Thank you for considering my inquiry, and I appreciate your time.</p>
    <p>Warm regards,<br/>
    Randal Herndon<br/>
    Crib Music Global<br/>
    </p>
    <a href="https://cribmusic.xyz" target="_blank" rel="noopener">
    <img src=${image} alt="logo" style="width: 150px"/></a>
    <p><a href="https://cribmusic.xyz" target="_blank" rel="noopener">cribmusic.xyz</a></p>`,
    description: "Initial Email",
  },
  {
    title: "Invite new Artist",
    element: `
    <p>Dear XXXX,</p>
    <p>I trust this message finds you in good spirits and that your week is off to a fantastic start. My name is Randal Herndon, and I'm a composer and songwriter specializing in XXXGENREXXXX music. I've been admiring your work, particularly as the supervisor on XXSHOWXXFILMXX, and I am reaching out to explore the possibility of connecting you with my music catalog.</p>
    <p>The contrasting yet cohesive soundtrack of XXSHOWXX caught my attention, and it truly added depth to the overall viewing experience. Your talent and skill in curating such impactful musical elements do not go unnoticed.</p>
    <p>I am confident that my catalog, coupled with my background in XXGENREXX, aligns seamlessly with your library and song selection. To provide you with a glimpse of my work, I have attached a few samples in both audio and video formats. I hope you find them reflective of the unique style I bring to the table.</p>
    <p>I am open to discussing my approach further, and I would love the opportunity to learn more about your creative process and criteria for selecting music. Pursuing music supervision is an aspiration of mine, and I believe our shared passion for creating memorable soundscapes could lead to a fruitful collaboration.</p>
    <p>I look forward to the possibility of hearing back from you and the opportunity to connect further. Thank you for considering my inquiry, and I appreciate your time.</p>
    <p>Warm regards,<br/>
    Randal Herndon<br/>
    Crib Music Global<br/>
    </p>
    <a href="https://cribmusic.xyz" target="_blank" rel="noopener">
    <img src=${image} alt="logo" style="width: 150px"/></a>
    <p><a href="https://cribmusic.xyz" target="_blank" rel="noopener">cribmusic.xyz</a></p>`,
    description: "Initial Email",
  },
  {
    title: "Welcome new artist",
    element: `
    <p>Dear XXXX,</p>
    <p>I trust this message finds you in good spirits and that your week is off to a fantastic start. My name is Randal Herndon, and I'm a composer and songwriter specializing in XXXGENREXXXX music. I've been admiring your work, particularly as the supervisor on XXSHOWXXFILMXX, and I am reaching out to explore the possibility of connecting you with my music catalog.</p>
    <p>The contrasting yet cohesive soundtrack of XXSHOWXX caught my attention, and it truly added depth to the overall viewing experience. Your talent and skill in curating such impactful musical elements do not go unnoticed.</p>
    <p>I am confident that my catalog, coupled with my background in XXGENREXX, aligns seamlessly with your library and song selection. To provide you with a glimpse of my work, I have attached a few samples in both audio and video formats. I hope you find them reflective of the unique style I bring to the table.</p>
    <p>I am open to discussing my approach further, and I would love the opportunity to learn more about your creative process and criteria for selecting music. Pursuing music supervision is an aspiration of mine, and I believe our shared passion for creating memorable soundscapes could lead to a fruitful collaboration.</p>
    <p>I look forward to the possibility of hearing back from you and the opportunity to connect further. Thank you for considering my inquiry, and I appreciate your time.</p>
    <p>Warm regards,<br/>
    Randal Herndon<br/>
    Crib Music Global<br/>
    </p>
    <a href="https://cribmusic.xyz" target="_blank" rel="noopener">
    <img src=${image} alt="logo" style="width: 150px"/></a>
    <p><a href="https://cribmusic.xyz" target="_blank" rel="noopener">cribmusic.xyz</a></p>`,
    description: "Initial Email",
  },
  {
    title: "Fresh Email",
    element: `
    <p>Dear XXXX,</p>
    <p>I trust this message finds you in good spirits and that your week is off to a fantastic start. My name is Randal Herndon, and I'm a composer and songwriter specializing in XXXGENREXXXX music. I've been admiring your work, particularly as the supervisor on XXSHOWXXFILMXX, and I am reaching out to explore the possibility of connecting you with my music catalog.</p>
    <p>The contrasting yet cohesive soundtrack of XXSHOWXX caught my attention, and it truly added depth to the overall viewing experience. Your talent and skill in curating such impactful musical elements do not go unnoticed.</p>
    <p>I am confident that my catalog, coupled with my background in XXGENREXX, aligns seamlessly with your library and song selection. To provide you with a glimpse of my work, I have attached a few samples in both audio and video formats. I hope you find them reflective of the unique style I bring to the table.</p>
    <p>I am open to discussing my approach further, and I would love the opportunity to learn more about your creative process and criteria for selecting music. Pursuing music supervision is an aspiration of mine, and I believe our shared passion for creating memorable soundscapes could lead to a fruitful collaboration.</p>
    <p>I look forward to the possibility of hearing back from you and the opportunity to connect further. Thank you for considering my inquiry, and I appreciate your time.</p>
    <p>Warm regards,<br/>
    Randal Herndon<br/>
    Crib Music Global<br/>
    </p>
    <a href="https://cribmusic.xyz" target="_blank" rel="noopener">
    <img src=${image} alt="logo" style="width: 150px"/></a>
    <p><a href="https://cribmusic.xyz" target="_blank" rel="noopener">cribmusic.xyz</a></p>`,
    description: "Initial Email",
  },
];

// const initFullProps = {
//   menubar: "edit view format tools table help",
//   formats: {
//     tindent_format: { selector: "p", styles: { "text-indent": "40mm" } },
//   },
//   toolbar:
//     "fullscreen preview print | undo redo | sizeselect | fontselect |  fontsizeselect| bold italic backcolor |  \
//      alignleft aligncenter alignright alignjustify tindent_bttn | tfecha_bttn | \
//      bullist numlist outdent indent | removeformat | restoredraft wordcount",
//   plugins: [
//     "wordcount ",
//     "link print ",
//     "preview fullscreen",
//     "insertdatetime wordcount ",
//     "insertdatetime",
//     "pagebreak",
//   ],
//   mobile: {
//     theme: "mobile",
//     toolbar: ["undo", "bold", "italic", "styleselect, restoredraft"],
//   },
//   fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt",
//   contextmenu: " copy  wordcount",
//   browser_spellcheck: true,
//   language: "en",
//   language_url: "/tinymce/langs/es.js",
//   paste_data_images: false,
//   force_p_newlines: false,
//   branding: false,
//   forced_root_block: "",
//   setup: (editor) => {
//     editor.ui.registry.addIcon(
//       "calendar",
//       '<svg version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="21px" height="21px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"><rect x="23.333" y="50" width="12" height="8" style="stroke:#ff0000;stroke-width:2;fill:#ffffff"/><rect x="43.333" y="50" width="12" height="8" style="stroke:#000000;stroke-width:2;fill:#ffffff"/><rect x="63.333" y="50" width="12" height="8" style="stroke:#000000;stroke-width:2;fill:#ffffff"/><rect x="23.333" y="66.666" 0width="12" height="8" style="stroke:#000000;stroke-width:2;fill:#ffffff"/><rect x="43.333" y="66.666" width="12" height="8" style="stroke:#000000;stroke-width:2;fill:#ffffff"/><rect x="63.333" y="66.666" width="12" height="8" style="stroke:#000000;stroke-width:2;fill:#ffffff"/><path d="M83.333,16.666h-10V10h-6.666v6.667H33.333V10h-6.666v6.667h-10c-3.666,0-6.667,3.001-6.667,6.667v66.666h80V23.333 C90,19.667,86.999,16.666,83.333,16.666z M83.333,83.333H16.667v-40h66.666V83.333z M16.667,36.666V23.333h10V30h6.666v-6.667 h33.334V30h6.666v-6.667h10v13.333H16.667z"/></svg>'
//     );
//     editor.ui.registry.addButton("tfecha_bttn", {
//       text: "",
//       icon: "calendar",
//       tooltip: "Inserta la fecha del día",
//       onAction: function () {
//         var d = new Date();
//         var n = d.getDay();
//         var fecha: string = d.toLocaleDateString("es-ES", {
//           weekday: "long",
//           year: "numeric",
//           month: "long",
//           day: "numeric",
//         });
//         editor.execCommand("mceInsertContent", false, fecha);
//       },
//     });
//   },
//   height: "800px",
//   content_css: "document",
//   content_style: `
//     html{
//       display: flex;
//       flex-flow: row nowrap;
//       justify-content: center;
//       margin: 0;
//       padding: 0;
//       background: rgb(248 249 250);
//     }

//     body {
//       zoom: 1.5;
//       width:150mm;
//       padding-left:20mm;
//       padding-right:20mm;
//       padding-top:15mm;
//       text-align: justify;
//       line-height: 1.5;
//       font-family: Arial;
//       font-size: 12pt;
//       background: rgb(248 249 250);
//       overflow-x: auto;
//       cursor: auto;
//       color: black;
//     }

//     .mce-content-body p {
//       margin: 0
//     }

//     figure {
//       outline: 3px solid #dedede;
//       position: relative;
//       display: inline-block
//     }
//     figure:hover {
//       outline-color: #ffc83d
//     }
//     figure > figcaption {
//       color: #333;
//       background-color: #f7f7f7;
//       text-align: center
//     }
//     `,
// };

export const getEditorProps = (mode: string) => {
  if (mode === "dark") {
    return editorPropsDark;
  } else if (mode === "light") {
    return editorProps;
  }
};
