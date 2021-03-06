#include <v8.h>
#include <uv.h>
#include <node.h>
#include <unistd.h>

using namespace v8;
using namespace node;

struct AsyncRequest {
	v8::Isolate* isolate;
	v8::Persistent<v8::Function> cb;
};

void DoAsync (uv_work_t* task) {
	sleep(1);
}

void AfterAsync (uv_work_t* task) {
	Isolate* isolate = Isolate::GetCurrent();
	HandleScope scope(isolate);

  	TryCatch try_catch;
	AsyncRequest* req = reinterpret_cast<AsyncRequest*>(task ->data);
	Local<Function> callback = Local<Function>::New(isolate, req ->cb);
	const unsigned argc = 1;
	Local<Value> argv[argc] = { String::NewFromUtf8(isolate, "hello world") };
	
	// calling it like this means process.nextTick does not fire
	//callback->Call(isolate->GetCurrentContext()->Global(), argc, argv);

	// calling it like this means process.nextTick DOES fire.
	MakeCallback(isolate, isolate->GetCurrentContext()->Global(), callback, argc, argv);
  	
  	// cleanup
  	delete req;
  	delete task;

  	if (try_catch.HasCaught()) {
   	FatalException(isolate, try_catch);
  	}
}

void RunCallback(const FunctionCallbackInfo<Value>& args) {
	Isolate* isolate = Isolate::GetCurrent();
	HandleScope scope(isolate);

	AsyncRequest* req = new AsyncRequest();
	Local<Function> callback = Local<Function>::Cast(args[0]);
	req ->cb.Reset(isolate, callback); 

	uv_work_t* task = new uv_work_t();
	task ->data = req;

	// uncomment these to make the addon callback synchronously
	//DoAsync(task);
	//return AfterAsync(task);

	uv_queue_work(uv_default_loop(),
                 task,
                 DoAsync,
                 (uv_after_work_cb)AfterAsync);
}

void Init(Handle<Object> target, Handle<Value> module, void * something) {
  NODE_SET_METHOD(target, "RunCallback", RunCallback);
}

NODE_MODULE(addon, Init)
