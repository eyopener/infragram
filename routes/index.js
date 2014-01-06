var mongoose = require( 'mongoose' );
var Image     = mongoose.model( 'Image' );

/*
 * GET home page.
 */

exports.index = function(req, res){
  Image.find( function ( err, images, count ){
    res.render( 'index', {
      title : 'Infragram: online infrared image analysis',
      images : images
    });
  });
};

exports.show = function(req, res){
  Image.findOne({ _id: req.params.id }, 'src desc author', function (err, image) {
    if (err) return handleError(err);
    res.render( 'show', {
      image : image
    });
  })
};

exports.delete = function(req, res){
  Image.remove({ _id: req.params.id }, function (err, image) {
    if (err) return handleError(err);
    res.redirect('/');
  })
};

exports.create = function ( req, res ){
  new Image({
    title: req.body.title,
    author: req.body.author,
    desc: req.body.desc,
    orig_src: req.body.orig_src,
    src: req.body.src,
    log: req.body.log,
    updated_at : Date.now(),
  }).save( function( err, todo, count ){
    res.redirect( '/' );
  });
};
