const getApiKey = () => {
  if (process.env.TINYMCE_API_KEY as string || process.env.NEXT_PUBLIC_TINYMCE_API_KEY as string){
    return process.env.TINYMCE_API_KEY || process.env.NEXT_PUBLIC_TINYMCE_API_KEY
  }
  throw Error('TinyMCE Key Not available')
}


export const editorProps = {
    initialValue: "Welcome to TinyMCE!",
    apiKey: getApiKey(),
    init: {
      height: 600,
      plugins: 'ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
      toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
      tinycomments_mode: 'embedded',
      tinycomments_author: 'Author name',
      mergetags_list: [
        { value: 'First.Name', title: 'First Name' },
        { value: 'Email', title: 'Email' },
      ],
      //skin: 'oxide',
      //content_css: '' ,
      ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
    },
}


export const editorPropsDark = {
  initialValue: "Welcome to TinyMCE!",
  apiKey: getApiKey(),
  init: {
    height: 600,
    plugins: 'ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
    tinycomments_mode: 'embedded',
    tinycomments_author: 'Author name',
    mergetags_list: [
      { value: 'First.Name', title: 'First Name' },
      { value: 'Email', title: 'Email' },
    ],
    skin: 'oxide-dark',
    content_css: 'dark' ,
   // skin_style: 'body { background-color: black; color: white; }',

    content_style: 'body { background-color: black; color: white; }',

    ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
  },
}

export const getEditorProps = (mode) => {
  if (mode === 'dark'){
    return editorPropsDark
  } else if (mode === 'light'){
    return editorProps
  }

}