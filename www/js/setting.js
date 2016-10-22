var db;
var shortName = "dtrd";
var version = "1.6";
var displayName = "dtrd";
var maxSize = 10 * 1024;

var Create_Tables_Query = new Array();
Create_Tables_Query[0] = 'CREATE  TABLE  IF NOT EXISTS "nrgyn_basic_settings" ("id" INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL , "app_title" TEXT, "status" BOOL, "Add_User" INTEGER, "Mode_User" INTEGER, "curr_lang_id" INTEGER, "Add_DateTime" DATETIME, "Mode_DateTime" DATETIME);';
Create_Tables_Query[1] = 'CREATE  TABLE  IF NOT EXISTS "nrgyn_app_langs" ("lang_id" INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL , "lang_code" VARCHAR, "lang_title" VARCHAR, "status" INTEGER);';
Create_Tables_Query[2] = 'CREATE  TABLE  IF NOT EXISTS "nrgyn_daily_songs" ("daily_song_id" INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL ,"songTitle" VARCHAR, "offline_song" VARCHAR, "online_song" VARCHAR, "day" INTEGER, "status" INTEGER, "sort" INTEGER, "Add_User" INTEGER, "Mode_User" INTEGER, "Add_DateTime" DATETIME,"Mode_DateTime" DATETIME);';
Create_Tables_Query[3] = 'CREATE  TABLE  IF NOT EXISTS "nrgyn_main_cat" ("cat_id" INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL , "parent_cat_id" INTEGER DEFAULT 0, "sort" INTEGER DEFAULT 99, "status" INTEGER DEFAULT 1, "online_bg_img" TEXT, "offline_bg_img" TEXT, "Add_User" INTEGER, "Mode_User" INTEGER, "Add_DateTime" DATETIME, "Mode_DateTime" DATETIME);';
Create_Tables_Query[4] = 'CREATE  TABLE  IF NOT EXISTS "nrgyn_main_cat_des" ("cat_des_id" INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL , "cat_id" INTEGER, "lang_id" INTEGER, "name" VARCHAR, "status" INTEGER DEFAULT 1);';
Create_Tables_Query[5] = 'CREATE  TABLE  IF NOT EXISTS "nrgyn_posts" ("post_id" INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL , "cat_id" INTEGER, "offline_thumb_img" TEXT, "online_thumb_img" TEXT, "offline_song" TEXT, "online_song" TEXT, "status" INTEGER DEFAULT 1, "sort" INTEGER DEFAULT 99, "Add_User" INTEGER, "Mode_User" INTEGER, "Add_DateTime" DATETIME, "Mode_DateTime" DATETIME);';
Create_Tables_Query[6] = 'CREATE  TABLE  IF NOT EXISTS "nrgyn_posts_des" ("post_des_id" INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL , "post_id" INTEGER, "lang_id" INTEGER, "post_title" TEXT, "post_desc" TEXT, "status" INTEGER DEFAULT 1);';

var ang_app = angular.module("rgyan", []);
ang_app.controller("rgyanCotrl", function ($scope, $http, $sce) {



    $scope.response = null;
    $scope.nrgyn_basic_settings = '';
    $scope.nrgyn_app_langs = '';
    $scope.nrgyn_daily_songs = '';
    $scope.nrgyn_main_cat = '';
    $scope.nrgyn_main_cat_des = '';
    $scope.nrgyn_posts = '';
    $scope.nrgyn_posts_des = '';
    $scope.PlaySong = "";//songname;


//$scope.mylog(cordova.file);
//"file:///storage/emulated/0/kuldeeprgyan/";
//"file:///storage/emulated/0/newrgyanimg/"; //
//cordova.file.cacheDirectory   
    $scope.ImageDir = "file:///storage/emulated/0/kuldeeprgyan/"; //cordova.file.dataDirectory+"kuldeeprgyan/";//   cordova.file.dataDirectory;
    $scope.app_title = "RGYAN MANTRA";
    $scope.MainCategory = {};
    $scope.MainCatStatus = ""; //intially show to user
    $scope.soundStatus = "fa-volume-up";
    $scope.preloader = "";
    $scope.message = "";
    $scope.downloading = "";


    $scope.Day = "SUNDAY";
    $scope.SongName = "Hanuman Chalisa";

    $scope.AudioPlayer = document.getElementById("AudioPlayer");

    $scope.MainSubCategory = {};
    $scope.MainSubCatStatus = "hidden"; ////intially hide from user
    $scope.Post = {};
    $scope.PostStatus = "hidden";

    $scope.PostDesc = {};
    $scope.PostDescStatus = "hidden";
    $scope.siteUrl = "http://rgyan.nexgi.com/";


    $scope.backScreenid = 0; // increment upt0 4;
    $scope.homeIcon = "fa-home"; //option fa-chevron-left

    $scope.curr_lang_id = 2;
    $scope.mantra = [{"mantra": "My ram matra"}, {"mantra": "My hanuman matra1"}, {"mantra": "My shiv matra12"}];
    $scope.close_aap = function () {


    };

    $scope.image_exist = function (Image)
    {
        if (Image !== '')
        {
            var file_url = 'img/'+Image;

            if (!$scope.fileExists(file_url))
            {
                return  $scope.ImageDir + Image;
            }
            else
            {
                return file_url;
            }
        }
        
        return '';
    };





    $scope.checkSong = function (song)
    {
        $scope.mylog("Song " + song);
        if (typeof song !== "undefined" && song !== 0 && song !== null)
            return true;
        return false;
    };

    $scope.Play_stop = function (song) {


        if (typeof song !== "undefined" && song !== 0 && song !== null)
        {
            $scope.soundStatus = "fa-volume-up";
            $scope.PlaySong = $scope.ImageDir + song;
            $scope.SongName = "Palying...";
            $scope.AudioPlayer.muted = false;

        }
        else
        {
            if ($scope.soundStatus === "fa-volume-up")
            {
                $scope.soundStatus = "fa fa-volume-off";
                $scope.AudioPlayer.muted = true;
            }
            else
            {
                $scope.soundStatus = "fa-volume-up";
                $scope.AudioPlayer.muted = false;
            }
        }






    };
    $scope.Synronize = function () {
        //next day syncronization ....
        // app.receivedEvent('deviceready');

        //        
        //        var sync = ContentSync.sync({
        //            src: 'https://nexgen/rgyan_app/assets/images',
        //            id: 'app-1',
        //            copyRootApp: true,
        //            manifest: 'manifest.json'
        //        });
        //
        //        sync.on('progress', function (data) {
        //
        //            $scope.mylog("progress");
        //            // data.progress
        //        });
        //
        //        sync.on('complete', function (data) {
        //            // data.localPath
        //            $scope.mylog("complete");
        //        });
        //
        //        sync.on('error', function (e) {
        //            $scope.mylog("error");
        //            // e
        //        });
        //
        //        sync.on('cancel', function () {
        //            // triggered if event is cancelled
        //            $scope.mylog("cancel");
        //        });


    };
    $scope.CreateDatabase = function () {

        //        $scope.DownloadDataBase();
        // $scope.Synronize();
        //   angular.element(document).addEventListener("deviceready", function () {
        //    $scope.mylog("load 1");
        if (!window.openDatabase) {
            $scope.mylog("load2");
            // not all mobile devices support databases  if it does not, the
            //following  $scope.mylog will display
            // indicating the device will not be albe to run this application
            //  $scope.mylog("Databases are not supported in this browser.");
            return;
        }

        db = window.openDatabase(shortName, version, displayName, maxSize);
        // var db = window.sqlitePlugin.openDatabase({name: "rgyan.db", location: "default"});
        //  $scope.mylog(db);
        if (db)
        {
            $scope.mylog("Database open..");

            $scope.CreateTables(0);

            //            $scope.appInit();
            //  $scope.mylog("created");
        } else
        {
            //  $scope.mylog("not created");
        }
        //            });
    };

    $scope.CreateTables = function (i) {

        if (db)
        {
            ///  $scope.mylog($scope.sql.split(";\n"));
            //  $scope.mylog();
            // return 0;

            //  $scope.processQuery(db, 0, $scope.sql.split(";\n"), shortName);
            //var i = 0;
            if (i < Create_Tables_Query.length)
            {
                var query = Create_Tables_Query[i];
                db.transaction(function (transaction) {
                    transaction.executeSql(query, [],
                            function (tx, result) {
                                $scope.mylog(query);
                                $scope.mylog("Table " + i + " created successfully");
                                i = i + 1;
                                $scope.CreateTables(i);
                            },
                            function (tc, error) {
                                $scope.mylog("Error occurred while creating the table." + error.message);
                            });
                });
            }

            if (i == Create_Tables_Query.length)
            {
                $scope.DownloadDataBase();
            }




        }
        else
        {
            $scope.mylog("db not access");
        }

    };
    $scope.ImportDataInTables = function () {


        if ($scope.response != null)
        {
            //data inseting in basic setting tabel
            if (typeof $scope.response.setting != 'undefined')
            {
                var setting = $scope.response.setting;
                var i = 0;
                for (i = 0; i < setting.length; i++)
                {
                    var coloumn = Object.keys(setting[i]).toString();
                    var values = Object.values(setting[i]);
                    //var values =setting[i].valueOf();
                    $scope.insertData(coloumn, values, 'nrgyn_basic_settings');
//                    $scope.mylog(setting[i]);
//                    $scope.mylog(coloumn);
//                    $scope.mylog(values);
                }

            }




            //data inseting in basic language tabel
            if (typeof $scope.response.language != 'undefined')
            {
                var language = $scope.response.language;
                i = 0;
                for (i = 0; i < language.length; i++)
                {
                    var coloumn = Object.keys(language[i]).toString();
                    var values = Object.values(language[i]);
                    //var values =setting[i].valueOf();
                    $scope.insertData(coloumn, values, 'nrgyn_app_langs');
//                    $scope.mylog(language[i]);
//                    $scope.mylog(coloumn);
//                    $scope.mylog(values);
                }

            }




            //data inseting in basic catDesc tabel
            if (typeof $scope.response.catDesc != 'undefined')
            {
                var catDesc = $scope.response.catDesc;
                i = 0;
                for (i = 0; i < catDesc.length; i++)
                {
                    var coloumn = Object.keys(catDesc[i]).toString();
                    var values = Object.values(catDesc[i]);
                    //var values =setting[i].valueOf();
                    $scope.insertData(coloumn, values, 'nrgyn_main_cat_des');
//                    $scope.mylog(setting[i]);
//                    $scope.mylog(coloumn);
//                    $scope.mylog(values);
                }

            }



            //data inseting in basic category tabel
            if (typeof $scope.response.category != 'undefined')
            {
                var category = $scope.response.category;
                i = 0;
                for (i = 0; i < category.length; i++)
                {
                    var coloumn = Object.keys(category[i]).toString();
                    var values = Object.values(category[i]);
                    //var values =setting[i].valueOf();
                    $scope.insertData(coloumn, values, 'nrgyn_main_cat');
//                    $scope.mylog(category[i]);
//                    $scope.mylog(coloumn);
//                    $scope.mylog(values);
                }

            }



            //data inseting in basic dailySongs tabel
            if (typeof $scope.response.dailySongs != 'undefined')
            {
                var dailySongs = $scope.response.dailySongs;
                var i = 0;
                for (i = 0; i < dailySongs.length; i++)
                {
                    var coloumn = Object.keys(dailySongs[i]).toString();
                    var values = Object.values(dailySongs[i]);
                    //var values =setting[i].valueOf();
                    $scope.insertData(coloumn, values, 'nrgyn_daily_songs');
//                    $scope.mylog(dailySongs[i]);
//                    $scope.mylog(coloumn);
//                    $scope.mylog(values);
                }

            }

            //data inseting in basic post tabel
            if (typeof $scope.response.post != 'undefined')
            {
                var post = $scope.response.post;
                i = 0;
                for (i = 0; i < post.length; i++)
                {
                    var coloumn = Object.keys(post[i]).toString();
                    var values = Object.values(post[i]);
                    //var values =setting[i].valueOf();
                    $scope.insertData(coloumn, values, 'nrgyn_posts');
//                    $scope.mylog(post[i]);
//                    $scope.mylog(coloumn);
//                    $scope.mylog(values);
                }

            }


            //data inseting in basic postDesc tabel
            if (typeof $scope.response.postDesc != 'undefined')
            {
                var postDesc = $scope.response.postDesc;
                i = 0;
                for (i = 0; i < postDesc.length; i++)
                {
                    var coloumn = Object.keys(postDesc[i]).toString();
                    var values = Object.values(postDesc[i]);
                    //var values =setting[i].valueOf();
                    $scope.insertData(coloumn, values, 'nrgyn_posts_des');
//                    $scope.mylog(postDesc[i]);
//                    $scope.mylog(coloumn);
//                    $scope.mylog(values);
                }

            }
        }

        $scope.appInit();
        $scope.assetsDownload();




    };

    $scope.urlEncode = function (image) {


        return $scope.ImageDir + image;

    };
    $scope.ChangeLanguage = function (id)
    {
        $scope.curr_lang_id = id;
        $scope.appInit();
    };

    $scope.DownloadDataBase = function () {

        //Download database from server and store in $scope.response

        document.addEventListener("offline", $scope.appInit(), false);

//        comment
        try
        {

            $http.get("http://admin.r-gyan.com/index.php/api")
                    // $http.get("sql/data.json")
                    .then(function (response) {
                        $scope.response = response.data;
                        $scope.mylog("Data Download");
                        //$scope.downloading ="Data Download";
                        $scope.ImportDataInTables();
                        //  $scope.CreateDatabase()
                        // $scope.CreateDatabase();
                        $scope.mylog($scope.response);
                        //     $scope.mylog(response.data);
                    }, function (response) {
                        $scope.mylog("Error in download database" + response.status);
                        //   $scope.appInit();
                    });
        } catch (err)
        {
            $scope.mylog("Error in try catch database" + err.message);

            $scope.appInit();
        }

    };



    $scope.insertData = function (coloumn, values, table) {

        //attr should be string with commma seperated values
        //values are array 
        //table name should be string.....
        var preQues = new Array();
        var start = 0;
        for (start = 0; start < values.length; start++)
        {
            preQues[start] = "?";
        }

        preQues = preQues.toString();
        db.transaction(function (transaction) {
            var executeQuery = "INSERT OR REPLACE INTO " + table + " (" + coloumn + ") VALUES (" + preQues + ") ";
            transaction.executeSql(executeQuery, values
                    , function (tx, result) {
                        //$scope.mylog("Inserted" + table);
                    },
                    function (transaction, error) {
                        $scope.mylog("Error: " + error.message + " code: " + error.code);
                    });
        });

    };


    $scope.appInit = function () {
        $scope.mylog("app initialted");
        $scope.getBasicSetting();
        $scope.getMainCategory();
        $scope.DailySongs();
        $scope.preloader = "hidden";


    };

    $scope.mylog = function (msg)
    {
        $scope.downloading += msg + "<br>";
    };

    $scope.getBasicSetting = function () {

        if (db)
        {
            db.transaction(function (transaction) {
                var sql = "SELECT app_title from nrgyn_basic_settings where curr_lang_id = " + $scope.curr_lang_id;
                transaction.executeSql(sql, []
                        , function (tx, results) {
                            $scope.mylog(results);
                            $scope.mylog(results.rows.item(0).app_title);

                            $scope.app_title = results.rows.item(0).app_title;
                            $scope.mylog($scope.app_title);
                            $scope.$apply();
                        }
                , function (error) {
                    $scope.mylog(error);
                });

            });
        }

    };

    $scope.getMainCategory = function () {
        var parent_id = 0;
        if (db)
        {
            db.transaction(function (transaction) {
                var sql = "SELECT mc.cat_id,mc.offline_bg_img,mcd.name from nrgyn_main_cat as mc left join nrgyn_main_cat_des as mcd on mc.cat_id =mcd.cat_id  where mc.parent_cat_id = " + parent_id + " and mcd.status=1 and mcd.lang_id = " + $scope.curr_lang_id;
                transaction.executeSql(sql, []
                        , function (tx, results) {
                            $scope.mylog(results.rows);


                            var len = results.rows.length, i;
                            //                        $("#rowCount").append(len);
                            var MainCategory = new Array();
                            for (i = 0; i < len; i++) {
                                $scope.mylog(results.rows.item(i).cat_id);
                                MainCategory[i] = {cat_id: results.rows.item(i).cat_id,
                                    offline_bg_img: results.rows.item(i).offline_bg_img,
                                    name: results.rows.item(i).name};


                                //   $("#TableData").append("<tr><td>" + results.rows.item(i).id + "</td><td>" + results.rows.item(i).title + "</td><td>" + results.rows.item(i).desc + "</td></tr>");
                            }

                            $scope.MainCategory = JSON.parse(JSON.stringify(MainCategory));
                            $scope.mylog($scope.MainCategory);



                            $scope.MainSubCatStatus = "hidden";
                            $scope.PostDescStatus = "hidden";
                            $scope.PostStatus = "hidden";
                            $scope.MainCatStatus = "";
                            $scope.homeIcon = "fa-home";
                            $scope.backScreenid = 0;

                            $scope.$apply();
                            //                    
                            //                    $scope.app_title = results.rows.item(0).app_title;
                            //                    $scope.mylog($scope.app_title);
                        }
                , function (error) {
                    $scope.mylog(error);
                });

            });
        }

    };

    $scope.subString = function (name)
    {

        //sub string the title of sub category
        if (name.length > 15)
        {
            name = name.replace(/<\/?[^>]+(>|$)/g, "");
            name = name.substring(0, 15) + "...";

        }
        return name;
    };
    $scope.show_sub_category = function (parent_id) {
        $scope.MainSubCategory = {};
        //$scope.$apply();
        //load the sub category when the main category is clicked; according to parent_id

        if (db)
        {
            db.transaction(function (transaction) {
                var sql = "SELECT mc.cat_id,mc.offline_bg_img,mcd.name from nrgyn_main_cat as mc left join nrgyn_main_cat_des as mcd on mc.cat_id =mcd.cat_id  where mc.parent_cat_id =" + parent_id + " and mcd.status=1 and mcd.lang_id = " + $scope.curr_lang_id;
                transaction.executeSql(sql, []
                        , function (tx, results) {
                            $scope.mylog(results.rows);


                            var len = results.rows.length, i;
                            //                        $("#rowCount").append(len);
                            var MainSubCategory = new Array();
                            for (i = 0; i < len; i++) {
                                $scope.mylog(results.rows.item(i).cat_id);
                                MainSubCategory[i] = {cat_id: results.rows.item(i).cat_id,
                                    offline_bg_img: results.rows.item(i).offline_bg_img,
                                    name: $scope.subString(results.rows.item(i).name)};


                                //   $("#TableData").append("<tr><td>" + results.rows.item(i).id + "</td><td>" + results.rows.item(i).title + "</td><td>" + results.rows.item(i).desc + "</td></tr>");
                            }

                            $scope.MainSubCategory = JSON.parse(JSON.stringify(MainSubCategory));
                            $scope.mylog($scope.MainSubCategory);

                            $scope.MainSubCatStatus = "";
                            $scope.PostDescStatus = "hidden";
                            $scope.PostStatus = "hidden";
                            $scope.MainCatStatus = "hidden";
                            $scope.homeIcon = "fa-chevron-left";
                            $scope.backScreenid = 1;
                            $scope.$apply();
                            //                    
                            //                    $scope.app_title = results.rows.item(0).app_title;
                            //                    $scope.mylog($scope.app_title);
                        }
                , function (error) {
                    $scope.mylog(error);
                });

            });
        }





    };


    $scope.show_post = function (cat_id) {
        $scope.Post = {};
        // $scope.$apply();
        //load the post the sub category is clicked; according to cat_id

        if (db)
        {
            db.transaction(function (transaction) {

                var sql = "SELECT p.post_id,p.online_thumb_img,pd.post_title,pd.post_desc,pd.post_des_id from nrgyn_posts as p left join nrgyn_posts_des as pd on p.post_id =pd.post_id  where p.cat_id =" + cat_id + " and p.status=1 and pd.lang_id = " + $scope.curr_lang_id;
                transaction.executeSql(sql, []
                        , function (tx, results) {
                            $scope.mylog(results.rows);


                            var len = results.rows.length, i;
                            //                        $("#rowCount").append(len);
                            var post = new Array();
                            for (i = 0; i < len; i++) {
                                //  $scope.mylog(results.rows.item(i).cat_id);
                                post[i] = {post_id: results.rows.item(i).post_id,
                                    offline_thumb_img: results.rows.item(i).online_thumb_img,
                                    post_title: results.rows.item(i).post_title,
                                    post_desc: results.rows.item(i).post_desc.substring(1, 40),
                                    post_des_id: results.rows.item(i).post_des_id
                                };



                            }

                            $scope.Post = JSON.parse(JSON.stringify(post));
                            $scope.mylog($scope.Post);

                            $scope.MainCatStatus = "hidden";
                            $scope.MainSubCatStatus = "hidden";
                            $scope.PostDescStatus = "hidden";
                            $scope.PostStatus = "";
                            $scope.homeIcon = "fa-chevron-left";
                            $scope.backScreenid = 2;


                            $scope.$apply();
                            //                    
                            //                    $scope.app_title = results.rows.item(0).app_title;
                            //                    $scope.mylog($scope.app_title);
                        }
                , function (error) {
                    $scope.mylog(error);
                });
            });
        }
    };



    $scope.show_post_desc = function (post_des_id) {
        $scope.PostDesc = {};
        $scope.mylog(post_des_id);
        //  $scope.$apply();
        //load the post the sub category is clicked; according to cat_id

        if (db)
        {
            db.transaction(function (transaction) {

                var sql = "SELECT DISTINCT pd.post_des_id, p.post_id,p.offline_song,p.online_thumb_img,pd.post_title,pd.post_desc from nrgyn_posts as p left join nrgyn_posts_des as pd on p.post_id = pd.post_id  where pd.post_des_id =" + post_des_id + " and pd.lang_id = " + $scope.curr_lang_id;
                transaction.executeSql(sql, []
                        , function (tx, results) {
                            $scope.mylog(results.rows);


                            var len = results.rows.length, i;
                            //                        $("#rowCount").append(len);
                            var post = new Array();
                            for (i = 0; i < len; i++) {
                                //  $scope.mylog(results.rows.item(i).cat_id);
                                post[i] = {post_id: results.rows.item(i).post_id,
                                    offline_thumb_img: results.rows.item(i).online_thumb_img,
                                    post_title: results.rows.item(i).post_title,
                                    post_desc: results.rows.item(i).post_desc,
                                    offline_song: results.rows.item(i).offline_song
                                };



                            }

                            $scope.PostDesc = JSON.parse(JSON.stringify(post));
                            $scope.mylog($scope.PostDesc);

                            $scope.MainCatStatus = "hidden";
                            $scope.MainSubCatStatus = "hidden";
                            $scope.PostStatus = "hidden";
                            $scope.PostDescStatus = "";

                            $scope.homeIcon = "fa-chevron-left";
                            $scope.backScreenid = 3;


                            $scope.$apply();
                            //                    
                            //                    $scope.app_title = results.rows.item(0).app_title;
                            //                    $scope.mylog($scope.app_title);
                        }
                , function (error) {
                    $scope.mylog(error);
                });
            });
        }
    };

    $scope.backScreen = function ()
    {

        if ($scope.backScreenid > 0)
        {
            $scope.backScreenid = $scope.backScreenid - 1;

            // $scope.$apply();
        }


        switch ($scope.backScreenid)
        {

            case 0:

                $scope.MainSubCatStatus = "hidden";
                $scope.PostDescStatus = "hidden";
                $scope.PostStatus = "hidden";
                $scope.MainCatStatus = "";
                $scope.homeIcon = "fa-home";



                break;
            case 1:
                $scope.MainCatStatus = "hidden";

                $scope.PostDescStatus = "hidden";
                $scope.PostStatus = "hidden";
                $scope.MainSubCatStatus = "";
                break;
            case 2:
                $scope.MainCatStatus = "hidden";
                $scope.MainSubCatStatus = "hidden";
                $scope.PostDescStatus = "hidden";
                $scope.PostStatus = "";
                break;
            case 3:
                $scope.MainCatStatus = "hidden";
                $scope.MainSubCatStatus = "hidden";
                $scope.PostStatus = "hidden";
                $scope.PostDescStatus = "";
                break;

            default:

                $scope.MainSubCatStatus = "hidden";
                $scope.PostDescStatus = "hidden";
                $scope.PostStatus = "hidden";
                $scope.MainCatStatus = "";
                break;
        }

        //$scope.$apply();

    };

    $scope.getData = function () {

        if (db)
        {
            db.transaction(function (transaction) {
                transaction.executeSql("SELECT * FROM phonegap_pro", [], function (tx, results) {

                    $scope.mylog(results.rows.item);
                    //                        var len = results.rows.length, i;
                    //                        $("#rowCount").append(len);
                    //                        for (i = 0; i < len; i++) {
                    //                            $("#TableData").append("<tr><td>" + results.rows.item(i).id + "</td><td>" + results.rows.item(i).title + "</td><td>" + results.rows.item(i).desc + "</td></tr>");
                    //                        }
                }, null);
            });

        }
        else
        {


            $scope.mylog("db not access");
        }
    };


    $scope.errorHandler = function (transaction, error) {

        $scope.mylog("Error: " + error.message + " code: " + error.code);
    };

    $scope.nullHandler = function (transaction, result) {
        $scope.mylog(result);
    };


    $scope.successCallBack = function () {
        $scope.mylog("success");
    };

    $scope.DailySongs = function ()
    {
        var d = new Date();
        var n = d.getDay();

        var weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";
        // $scope.mylog("day"+n);
        $scope.Day = weekday[n];
        if (db)
        {
            db.transaction(function (transaction) {

                var sql = "SELECT offline_song,songTitle from nrgyn_daily_songs where day =" + (n + 1);
                transaction.executeSql(sql, []
                        , function (tx, results) {
                            $scope.mylog("day row" + results.rows);
                            $scope.mylog(results.rows);
                            $scope.PlaySong = "mp3/" + results.rows.item(0).offline_song;
                            $scope.SongName = results.rows.item(0).songTitle;

                            $scope.$apply();
                            // document.getElementById('player').src = $scope.PlaySong;
                            //                    
                            //                    $scope.app_title = results.rows.item(0).app_title;
                            $scope.mylog(results.rows.item(0).offline_song);
                        }
                , function (error) {
                    $scope.mylog(error);
                });
            });
        }

    };




    $scope.assetsDownload = function ()
    {
        if (db)
        {
            //download sub category and main images
            db.transaction(function (transaction) {
                transaction.executeSql("SELECT offline_bg_img FROM nrgyn_main_cat", [], function (tx, results) {
                    $scope.mylog(results.rows.item);
                    var len = results.rows.length, i;
                    //$("#rowCount").append(len);

                    //cordova.file.createDir($scope.ImageDir,"img");

                    for (i = 0; i < len; i++) {

                        var image = results.rows.item(i).offline_bg_img;
                        var url = $scope.siteUrl + "upload/img/" + image;
                        var path = "";

                        var fileUrlInlocal = $scope.ImageDir + path + image;
                        if (!$scope.fileExists(fileUrlInlocal))
                        {
                            $scope.fileDownload(url, image, path);
                        }
                        // $scope.downloading = i + "/" +len;

//                                                $("#TableData").append("<tr><td>" + results.rows.item(i).id + "</td><td>" + results.rows.item(i).title + "</td><td>" + results.rows.item(i).desc + "</td></tr>");
                    }
                }, null);
            });

            //end


            //download images for post

            db.transaction(function (transaction) {
                transaction.executeSql("SELECT online_thumb_img FROM nrgyn_posts", [], function (tx, results) {
                    $scope.mylog(results.rows.item);
                    var len = results.rows.length, i;
                    //$("#rowCount").append(len);

                    //cordova.file.createDir($scope.ImageDir,"img");

                    for (i = 0; i < len; i++) {

                        var image = results.rows.item(i).online_thumb_img;
                        var url = $scope.siteUrl + "upload/img/" + image;
                        var path = "";

                        var fileUrlInlocal = $scope.ImageDir + path + image;
                        if (!$scope.fileExists(fileUrlInlocal))
                        {
                            $scope.fileDownload(url, image, path);
                        }
                        // $scope.downloading = i + "/" +len;

//                                                $("#TableData").append("<tr><td>" + results.rows.item(i).id + "</td><td>" + results.rows.item(i).title + "</td><td>" + results.rows.item(i).desc + "</td></tr>");
                    }
                }, null);
            });
            //end code


            //download songs

            db.transaction(function (transaction) {
                transaction.executeSql("SELECT offline_song FROM nrgyn_posts", [], function (tx, results) {
                    $scope.mylog(results.rows.item);
                    var len = results.rows.length, i;
                    //$("#rowCount").append(len);

                    //cordova.file.createDir($scope.ImageDir,"img");

                    for (i = 0; i < len; i++) {

                        var song = results.rows.item(i).offline_song;
                        var url = $scope.siteUrl + "upload/img/" + song;
                        var path = "";

                        var fileUrlInlocal = $scope.ImageDir + path + song;
                        if (!$scope.fileExists(fileUrlInlocal))
                        {
                            $scope.fileDownload(url, song, path);
                        }
                        // $scope.downloading = i + "/" +len;

//                                                $("#TableData").append("<tr><td>" + results.rows.item(i).id + "</td><td>" + results.rows.item(i).title + "</td><td>" + results.rows.item(i).desc + "</td></tr>");
                    }
                }, null);
            });

            //emd


        }
        else
        {


            $scope.mylog("db not access");
        }
    };


    $scope.fileExists = function (url) {
        if (url) {
            var req = new XMLHttpRequest();
            req.open('GET', url, false);
            req.send();
            return req.status == 200;
        } else {
            return false;
        }
    };

    $scope.reder_html = function (html) {


        return $sce.trustAsHtml(html);

    };

    $scope.fileDownload = function (url, name, savePath) {

        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {

            var imagePath = $scope.ImageDir + savePath + name;

            var fileTransfer = new FileTransfer();
            fileTransfer.download(url, imagePath, function (entry) {

                $scope.mylog(imagePath);

            }, function (error) {
                $scope.downloading += "Download error..." + error.code;
                // $scope.message = "error file downloading";
                $scope.mylog("download error source " + error.source);
                $scope.mylog("download error target " + error.target);
                $scope.mylog("upload error code: " + error.code);
                $scope.message = error.target;
                $scope.mylog(error);
            });
        }, function (error) {
            $scope.message = "Erro file handlong.." + error.code;
        });
        //other


    };

    $scope.CreateDatabase();




});


Object.prototype.values = function (object) {
    var values = [];
    for (var property in object) {
        values.push(object[property]);
    }
    values.pop();
    return values;
};


app.initialize();
//The result of n will be:
//
//2
//</script>
//
//<!--On the one hand as @Mark-Rajcok said you can just get away with private inner function:
//
//// at the bottom of your controller
//var init = function () {
//   // check if there is query in url
//   // and fire search in case its value is not empty
//};
//// and fire it after definition
//init();
//Also you can take a look at ng-init directive. Implementation will be much like:
//
//// register controller in html
//<div data-ng-controller="myCtrl" data-ng-init="init()"></div>
//
//// in controller
//$scope.init = function () {
//    // check if there is query in url
//    // and fire search in case its value is not empty
//};
//But take care about it as angular documentation implies (since v1.2) to NOT use ng-init for that. However imo it depends on architecture of your app.
//
//I used ng-init when I wanted to pass a value from back-end into angular app:
//
//<div data-ng-controller="myCtrl" data-ng-init="init("%some_backend_value%")"></div>-->


//    $scope.processQuery = function (db, i, queries, dbname) {
//
//        if (i < queries.length - 1) {
//
//            $scope.mylog(i + " of " + queries.length);
//            if (!queries[i + 1].match(/(INSERT|CREATE|DROP|PRAGMA|BEGIN|COMMIT)/)) {
//                queries[i + 1] = queries[i] + ";\n" + queries[i + 1];
//                return $scope.processQuery(db, i + 1, queries, dbname);
//            }
//            $scope.mylog("------------>", queries[i]);
//            db.transaction(function (query) {
//                query.executeSql(queries[i] + ";", [], function (tx, result) {
//                    $scope.processQuery(db, i + 1, queries, dbname);
//                });
//            }, function (err) {
//                $scope.mylog("Query error in ", queries[i], err.message);
//                $scope.processQuery(db, i + 1, queries, dbname);
//            });
//        } else {
//            $scope.mylog("Done importing!");
//        }
//
//    };