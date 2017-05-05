/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/blog/2016/01/03/平安内网标装机远程调试安卓webview的方法/index.html","888de27b7222870b93164619e4579cd6"],["/blog/2016/01/21/Mac下Chrome浏览器设置跨域/index.html","f79ba960aa18ac58ed22ac00ed970e4b"],["/blog/2016/06/21/Android WebView 前端开发调试/index.html","e5624319196be4e1f50f98f4721dbf34"],["/blog/2016/11/21/全栈工程师培训笔记/index.html","d0c9a2282d3de74c1d5ec9cc58cb8222"],["/blog/2016/12/13/ATS ( App Transport Security )是什么，以及如何支持 ATS/index.html","c6f118f38d3b651dd85280361a4d6497"],["/blog/2017/01/02/项目持续集成实践/index.html","25b6f6b8b2436433044afac61450b6d4"],["/blog/archives/2016/01/index.html","767a593561a2721650634edce10c59d0"],["/blog/archives/2016/06/index.html","7e6891557dd5d223a1658b41859e13a1"],["/blog/archives/2016/11/index.html","f0ca532718c7b55101585828b48cf7b5"],["/blog/archives/2016/12/index.html","67340b6db006fcea1159fe00fc71042e"],["/blog/archives/2016/index.html","0e4f5d4b723b2bdac27a59958354c4cb"],["/blog/archives/2017/01/index.html","e3c1c592b5ee1e62aa2154f6d1876fb0"],["/blog/archives/2017/index.html","dcb12cba7e1ca1a6492d75e140cc068c"],["/blog/archives/index.html","da2514c9973a3cfeb319e8614c5dd35c"],["/blog/categories/建站❤编程/index.html","d8a726a036c0f4711d292b2bc35da0c2"],["/blog/categories/科普小知识/index.html","b4abd016d7d211193fc472d74f578ce9"],["/blog/css/images/avatar.png","8c257f9fdc3c92ebd07e84f3eb181297"],["/blog/css/images/logo.png","b770d93c20b516bf7d98e1e2b50f93e8"],["/blog/css/images/thumb-default-small.png","0d3d38c94b750b66de049f80a7772ea7"],["/blog/css/style.css","1f2691b9aed400a9cf7cddb8b36583a5"],["/blog/index.html","36feb5233ddd61f4cc53c536d369d941"],["/blog/js/insight.js","c0ce0c62e8584741021f163f618b2982"],["/blog/js/main.js","e3fe907ad8b87fe4973e3a5bdc8acaf1"],["/blog/libs/font-awesome/css/font-awesome.css","a16730221cf9c8b1bad3dd5419edf16b"],["/blog/libs/font-awesome/css/font-awesome.min.css","bb53ad7bffecc0014d64553e96501dce"],["/blog/libs/font-awesome/fonts/fontawesome-webfont.eot","25a32416abee198dd821b0b17a198a8f"],["/blog/libs/font-awesome/fonts/fontawesome-webfont.svg","d7c639084f684d66a1bc66855d193ed8"],["/blog/libs/font-awesome/fonts/fontawesome-webfont.ttf","1dc35d25e61d819a9c357074014867ab"],["/blog/libs/font-awesome/fonts/fontawesome-webfont.woff","c8ddf1e5e5bf3682bc7bebf30f394148"],["/blog/libs/jquery/2.1.3/jquery.min.js","32015dd42e9582a80a84736f5d9a44d7"],["/blog/libs/justified-gallery/jquery.justifiedGallery.min.js","7b8f9e0d4b845e90381ae044b8b5e657"],["/blog/libs/justified-gallery/justifiedGallery.min.css","9a5e8949e0c84f864668f0205c5fafbd"],["/blog/libs/lightgallery/css/lg-fb-comment-box.css","2ab4129c7b8cd8f3d4d0ce62e66904d6"],["/blog/libs/lightgallery/css/lg-fb-comment-box.min.css","f216c9f755ca3131d5d8abff3eee5193"],["/blog/libs/lightgallery/css/lg-transitions.css","c7c90f6be9108b17e459ef992e7e889b"],["/blog/libs/lightgallery/css/lg-transitions.min.css","a3330c0ba52c1c1f912fa21966ba7079"],["/blog/libs/lightgallery/css/lightgallery.css","fd0ae83fc66fd7b96d2066b94805a39e"],["/blog/libs/lightgallery/css/lightgallery.min.css","2a128ed1be3f9be67ef99d92f95845fc"],["/blog/libs/lightgallery/fonts/lg.eot","ecff11700aad0000cf3503f537d1df17"],["/blog/libs/lightgallery/fonts/lg.svg","98d62b1e5f5b556facf319b19c6c7cba"],["/blog/libs/lightgallery/fonts/lg.ttf","4fe6f9caff8b287170d51d3d71d5e5c6"],["/blog/libs/lightgallery/fonts/lg.woff","5fd4c338c1a1b1eeeb2c7b0a0967773d"],["/blog/libs/lightgallery/img/loading.gif","0aeca8b09888accfccf11976b34c4e64"],["/blog/libs/lightgallery/img/video-play.png","4f03bd8dec67211ade8abdab39dcbf4a"],["/blog/libs/lightgallery/img/vimeo-play.png","699d005153517ee4264615dd1e4e2b64"],["/blog/libs/lightgallery/img/youtube-play.png","96bc9d7e27d077372cc0bc9524c500e6"],["/blog/libs/lightgallery/js/lg-autoplay.js","eead116e849544337f98e1f909984da6"],["/blog/libs/lightgallery/js/lg-autoplay.min.js","9cc557cce697d947b82db9c63bec1f56"],["/blog/libs/lightgallery/js/lg-fullscreen.js","4f138d53ae7b5f8ebec5917daebe1892"],["/blog/libs/lightgallery/js/lg-fullscreen.min.js","ad666d733183e14359ad2dc3b17ed161"],["/blog/libs/lightgallery/js/lg-hash.js","4de75c991f347a3501fdb2fe0833b1cf"],["/blog/libs/lightgallery/js/lg-hash.min.js","17182adfcf75dccb64391343c90586ad"],["/blog/libs/lightgallery/js/lg-pager.js","2ddc77bc71fdd588e05ee3f27b6e187b"],["/blog/libs/lightgallery/js/lg-pager.min.js","79ae9590a49eece30be5a7318d2836c6"],["/blog/libs/lightgallery/js/lg-share.js","40bb22981ba549bf9086118147608b4e"],["/blog/libs/lightgallery/js/lg-share.min.js","f38dda2f772f0cc5a143e40e0cb96eae"],["/blog/libs/lightgallery/js/lg-thumbnail.js","02e7bfe2e732f524cd3dd6f78dec110b"],["/blog/libs/lightgallery/js/lg-thumbnail.min.js","16d7b8599fddeb7af22cf00684ab2b25"],["/blog/libs/lightgallery/js/lg-video.js","4e1459c4a990ca4f9fe58f385762b31a"],["/blog/libs/lightgallery/js/lg-video.min.js","974a23bceeaada9b60c467129acfc422"],["/blog/libs/lightgallery/js/lg-zoom.js","284a3d8af84caf362eea54eefe89b145"],["/blog/libs/lightgallery/js/lg-zoom.min.js","280784d5d0c1cd5f74c758eb44217149"],["/blog/libs/lightgallery/js/lightgallery.js","22c34dbc5304139b95331d24c547c5fa"],["/blog/libs/lightgallery/js/lightgallery.min.js","d8362d715c324c128556fd285143e0af"],["/blog/libs/open-sans/styles.css","663afa138d47e4cef4455370cf00ee66"],["/blog/libs/source-code-pro/styles.css","fd6b67f05e7415482cf4e038fd39efed"],["/blog/tags/Node-js/index.html","55b3988766b101f6f43d58ea6c104736"],["/blog/tags/Node/index.html","613f927912b257d53b5f95a4afb25c22"],["/blog/tags/React/index.html","bd8193e4692c0a71eafedf99df92e8ab"],["/blog/tags/android/index.html","7bff384aeb6f95cdf2dd00bffa1ef50f"],["/blog/tags/webview/index.html","91b11718fd56d7f08bcde190c66099d2"],["/blog/tags/培训/index.html","0b076cbb51a14d05e2fff72d8e8e1027"],["/blog/tags/实践/index.html","5ec36c85022f32e3586a9782975bbb74"],["/blog/tags/持续集成/index.html","eed1b8d1b5b910c926e228f1a98bbaa1"],["/blog/tags/框架/index.html","978ff763a58960950a1fd3df90b4e02d"],["/blog/tags/测试/index.html","140ef9207066bcea9e2a05b0d5bc7f66"],["/blog/tags/调试/index.html","43a13b0aae3955f88090f7484ddb6d05"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







