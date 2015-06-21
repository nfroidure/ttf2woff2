#include <node.h>
#include <node_buffer.h>
#include <string.h>
#include <stdio.h>
#include "./woff2/woff2_enc.h"

using namespace v8;

void Convert(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = Isolate::GetCurrent();
  HandleScope scope(isolate);

  if (args.Length() < 1) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong number of arguments")));
    return;
  }

  if (!args[0]->IsObject()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Not an object")));
    return;
  }

  Local<Object> inputBuffer = args[0]->ToObject();

  if (!node::Buffer::HasInstance(inputBuffer)) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "First arg should be a Buffer")));
  }

  size_t input_length = inputBuffer->GetIndexedPropertiesExternalArrayDataLength();
  char* input_data = static_cast<char*>(
      inputBuffer->GetIndexedPropertiesExternalArrayData());

  size_t output_length = woff2::MaxWOFF2CompressedSize(
    reinterpret_cast<const uint8_t*>(input_data), input_length);
  char* output_data[output_length];


  if (!woff2::ConvertTTFToWOFF2(
    reinterpret_cast<const uint8_t*>(input_data), input_length,
    reinterpret_cast<uint8_t*>(output_data), &output_length
  )) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Could not convert the given font.")));
  }

  Local<Object> slowBuffer = node::Buffer::New(isolate, output_length);
  memcpy(node::Buffer::Data(slowBuffer), output_data, output_length);

  Local<Object> globalObj = isolate->GetCurrentContext()->Global();
  Local<Function> bufferConstructor =
    Local<Function>::Cast(globalObj->Get(String::NewFromUtf8(isolate, "Buffer")));
  Handle<Value> constructorArgs[3] = {
    slowBuffer,
    Number::New(isolate, static_cast<int>(output_length)),
    Number::New(isolate, 0)
  };
  Local<Object> actualBuffer = bufferConstructor->NewInstance(3, constructorArgs);
  args.GetReturnValue().Set(actualBuffer);
}

void Init(Handle<Object> exports) {
  NODE_SET_METHOD(exports, "convert", Convert);
}

NODE_MODULE(addon, Init)
