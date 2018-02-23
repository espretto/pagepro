
export default [
  'Access-Control-Allow-Origin',
  'Accept-Ranges',
  'Age',
  'Allow',
  'Cache-Control',
  'Connection',
  'Content-Encoding',
  'Content-Language',
  'Content-Length',
  'Content-Location',
  'Content-MD5',
  'Content-Disposition',
  'Content-Range',
  'Content-Type',
  'Date',
  'ETag',
  'Expires',
  'Last-Modified',
  'Link',
  'Location',
  'P3P',
  'Pragma',
  'Proxy-Authenticate',
  'Refresh',
  'Retry-After',
  'Server',
  'Set-Cookie',
  'Strict-Transport-Security',
  'Trailer',
  'Transfer-Encoding',
  'Vary',
  'Via',
  'Warning',
  'WWW-Authenticate',
  'X-Frame-Options',
  'X-XSS-Protection',
  'X-Content-Type-Options',
  'X-Powered-By',
  'X-UA-Compatible'
]

/*
export default { 
  'Access-Control-Allow-Origin': {
    description: 'Specifying which web sites can participate in cross-origin resource sharing',
    example: 'Access-Control-Allow-Origin: *'
  },
  'Accept-Ranges': {
    description: 'What partial content range types this server supports',
    example: 'Accept-Ranges: bytes'
  },
  'Age': {
    description: 'The age the object has been in a proxy cache in seconds',
    example: 'Age: 12'
  },
  'Allow': {
    description: 'Valid actions for a specified resource. To be used for a 405 Method not allowed',
    example: 'Allow: GET, HEAD'
  },
  'Cache-Control': {
    description: 'Tells all caching mechanisms from server to client whether they may cache this object. It is measured in seconds',
    example: 'Cache-Control: max-age=3600'
  },
  'Connection': {
    description: 'Options that are desired for the connection[20]',
    example: 'Connection: close'
  },
  'Content-Encoding': {
    description: 'The type of encoding used on the data. See HTTP compression.',
    example: 'Content-Encoding: gzip'
  },
  'Content-Language': {
    description: 'The language the content is in',
    example: 'Content-Language: da'
  },
  'Content-Length': {
    description: 'The length of the response body in octets (8-bit bytes)',
    example: 'Content-Length: 348'
  },
  'Content-Location': {
    description: 'An alternate location for the returned data',
    example: 'Content-Location: /index.htm'
  },
  'Content-MD5': {
    description: 'A Base64-encoded binary MD5 sum of the content of the response',
    example: 'Content-MD5: Q2hlY2sgSW50ZWdyaXR5IQ=='
  },
  'Content-Disposition': {
    description: 'An opportunity to raise a "File Download" dialogue box for a known MIME type with binary format or suggest a filename for dynamic content. Quotes are necessary with special characters.',
    example: 'Content-Disposition: attachment; filename="fname.ext"'
  },
  'Content-Range': {
    description: 'Where in a full body message this partial message belongs',
    example: 'Content-Range: bytes 21010-47021/47022'
  },
  'Content-Type': {
    description: 'The MIME type of this content',
    example: 'Content-Type: text/html; charset=utf-8'
  },
  'Date': {
    description: 'The date and time that the message was sent',
    example: 'Date: Tue, 15 Nov 1994 08:12:31 GMT'
  },
  'ETag': {
    description: 'An identifier for a specific version of a resource, often a message digest',
    example: 'ETag: "737060cd8c284d8af7ad3082f209582d"'
  },
  'Expires': {
    description: 'Gives the date/time after which the response is considered stale',
    example: 'Expires: Thu, 01 Dec 1994 16:00:00 GMT'
  },
  'Last-Modified': {
    description: 'The last modified date for the requested object, in RFC 2822 format',
    example: 'Last-Modified: Tue, 15 Nov 1994 12:45:26 GMT'
  },
  'Link': {
    description: 'Used to express a typed relationship with another resource, where the relation type is defined by RFC 5988',
    example: 'Link: </feed>; rel="alternate"[24]'
  },
  'Location': {
    description: 'Used in redirection, or when a new resource has been created.',
    example: 'Location: http://www.w3.org/pub/WWW/People.html'
  },
  'P3P': {
    description: 'This header is supposed to set P3P policy, in the form of P3P:CP="your_compact_policy". However, P3P did not take off,[25] most browsers have never fully implemented it, a lot of websites set this header with fake policy text, that was enough to fool browsers the existence of P3P policy and grant permissions for third party cookies.',
    example: 'P3P: CP="This is not a P3P policy! See http:// www.google.com/support/accounts/bin/answer.py?hl=en&answer=151657"'
  },
  'Pragma': {
    description: 'Implementation-specific headers that may have various effects anywhere along the request-response chain.',
    example: 'Pragma: no-cache'
  },
  'Proxy-Authenticate': {
    description: 'Request authentication to access the proxy.',
    example: 'Proxy-Authenticate: Basic'
  },
  'Refresh': {
    description: 'Used in redirection, or when a new resource has been created. This refresh redirects after 5 seconds. This is a proprietary, non-standard header extension introduced by Netscape and supported by most web browsers.',
    example: 'Refresh: 5; url=http://www.w3.org/pub/WWW/People.html'
  },
  'Retry-After': {
    description: 'If an entity is temporarily unavailable, this instructs the client to try again after a specified period of time (seconds).',
    example: 'Retry-After: 120'
  },
  'Server': {
    description: 'A name for the server',
    example: 'Server: Apache/2.4.1 (Unix)'
  },
  'Set-Cookie': {
    description: 'an HTTP cookie',
    example: 'Set-Cookie: UserID=JohnDoe; Max-Age=3600; Version=1'
  },
  'Strict-Transport-Security': {
    description: 'A HSTS Policy informing the HTTP client how long to cache the HTTPS only policy and whether this applies to subdomains.',
    example: 'Strict-Transport-Security: max-age=16070400; includeSubDomains'
  },
  'Trailer': {
    description: 'The Trailer general field value indicates that the given set of header fields is present in the trailer of a message encoded with chunked transfer-coding.',
    example: 'Trailer: Max-Forwards'
  },
  'Transfer-Encoding': {
    description: 'The form of encoding used to safely transfer the entity to the user. Currently defined methods are: chunked, compress, deflate, gzip, identity.',
    example: 'Transfer-Encoding: chunked'
  },
  'Vary': {
    description: 'Tells downstream proxies how to match future request headers to decide whether the cached response can be used rather than requesting a fresh one from the origin server.',
    example: 'Vary: *'
  },
  'Via': {
    description: 'Informs the client of proxies through which the response was sent.',
    example: 'Via: 1.0 fred, 1.1 example.com (Apache/1.1)'
  },
  'Warning': {
    description: 'A general warning about possible problems with the entity body.',
    example: 'Warning: 199 Miscellaneous warning'
  },
  'WWW-Authenticate': {
    description: 'Indicates the authentication scheme that should be used to access the requested entity.',
    example: 'WWW-Authenticate: Basic'
  },
  'X-Frame-Options': {
    description: 'Clickjacking protection: "deny" - no rendering within a frame, "sameorigin" - no rendering if origin mismatch',
    example: 'X-Frame-Options: deny'
  },
  'X-XSS-Protection': {
    description: 'Cross-site scripting (XSS) filter',
    example: 'X-XSS-Protection: 1; mode=block'
  },
  'X-Content-Type-Options': {
    description: 'The only defined value, "nosniff", prevents Internet Explorer from MIME-sniffing a response away from the declared content-type. This also applies to Google Chrome, when downloading extensions.[29]',
    example: 'X-Content-Type-Options: nosniff'
  },
  'X-Powered-By': {
    description: 'specifies the technology (e.g. ASP.NET, PHP, JBoss) supporting the web application (version details are often in X-Runtime, X-Version, or X-AspNet-Version)',
    example: 'X-Powered-By: PHP/5.4.0'
  },
  'X-UA-Compatible': {
    description: 'Recommends the preferred rendering engine (often a backward-compatibility mode) to use to display the content. Also used to activate Chrome Frame in Internet Explorer.',
    example: 'X-UA-Compatible: IE=EmulateIE7 or X-UA-Compatible: IE=edge or X-UA-Compatible: Chrome=1'
  }
}
*/
